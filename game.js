var game = {
    scene: null,
    field_size: 0,
    gamertype: 'monkey',
    randomtype: 'person',
    level: 'easy',
    next_tile: 2,
    ai: null,
    state: 'ok',
    score: 0,
    tmpscore:0,

    initialize: function (gamertype, level, field_size) {
        this.field_size = field_size || 4;
        this.set_gamertype(gamertype);
        this.set_level(level);
        this.update_next_tile();
        this.scene = new Array(this.field_size);
        this.score = 0;
        this.tmpscore = 0;
        for (var i = 0; i < this.field_size; ++i) {
            this.scene[i] = new Array(this.field_size);
            for (var j = 0; j < this.field_size; ++j) {
                this.scene[i][j] = 0;
            }
        }
        this.ai = new AI();
    },

    get_min: function () {
        var min_val = 4096;
        for (var i = 0; i < this.field_size; ++i) {
            for (var j = 0; j < this.field_size; ++j) {
                if (this.scene[i][j] != 0) {
                    if (this.scene[i][j] < min_val) min_val = this.scene[i][j];
                }
            }
        }
        if (min_val == 4096) min_val = 2;
        return min_val;
    },

    set_level: function (level) {
        this.level = level || 'easy';
    },

    set_gamertype: function (gamertype) {
        this.gamertype = gamertype || 'monkey';
    },

    update_next_tile: function () {
        if (Math.random() > 0.1) {
            this.next_tile = 2;
        } else {
            this.next_tile = 4;
        }

    },

    move_left: function () {
        var start, tmp;
        this.tmpscore = 0;
        for (var i = 0; i < this.field_size; ++i) {
            start = 0;
            for (var j = 1; j < this.field_size; ++j) {
                if (this.scene[i][j] != 0) {
                    if (this.scene[i][start] == 0) {
                        tmp = this.scene[i][j];
                        this.scene[i][j] = 0;
                        this.scene[i][start] = tmp;
                    } else {
                        if (this.scene[i][j] == this.scene[i][start]) {
                            this.scene[i][start] *= 2;

                            this.tmpscore += this.scene[i][start];

                            this.scene[i][j] = 0;
                            ++start;
                        } else {
                            ++start;
                            tmp = this.scene[i][j];
                            this.scene[i][j] = 0;
                            this.scene[i][start] = tmp;
                        }
                    }
                }
            }
        }
    },

    rotate: function() {
        var scene_tmp = new Array(this.field_size);
        for (var i = 0; i < this.field_size; ++i) {
            scene_tmp[i] = new Array(this.field_size);
            for (var j = 0; j < this.field_size; ++j) {
                scene_tmp[i][j] = this.scene[i][j];
            }
        }

        for (var i = 0; i < this.field_size; ++i) {
            for (var j = 0; j < this.field_size; ++j) {
                this.scene[j][this.field_size - 1 - i] = scene_tmp[i][j];
            }
        }
       // console.log(scene_tmp, this.scene);
    },

    rotate_back: function() {
        var scene_tmp = new Array(this.field_size);
        for (var i = 0; i < this.field_size; ++i) {
            scene_tmp[i] = new Array(this.field_size);
            for (var j = 0; j < this.field_size; ++j) {
                scene_tmp[i][j] = this.scene[i][j];
            }
        }

        for (var i = 0; i < this.field_size; ++i) {
            for (var j = 0; j < this.field_size; ++j) {
                this.scene[this.field_size - 1 - j][i] = scene_tmp[i][j];
            }
        }
      //  console.log("rb", scene_tmp, this.scene);
    },

    try_move: function(way) {
        //console.log("way = ", way);
        for (var i = 0; i < way; ++i) {
            this.rotate();
        }

        this.move_left();

        for (var i = 0; i < way; ++i) {
            this.rotate_back();
        }

    },

    move: function(way) {
        //console.log(way);
        var scene_tmp = new Array(this.field_size);
        for (var i = 0; i < this.field_size; ++i) {
            scene_tmp[i] = new Array(this.field_size);
            for (var j = 0; j < this.field_size; ++j) {
                scene_tmp[i][j] = this.scene[i][j];
            }
        }

        this.try_move(way);

        for (var k = 0; k < 4; ++k) {
            for (var i = 0; i < 4; ++i) {
                for (var j = 0; j < 4; ++j) {
                    if (scene_tmp[i][j] != this.scene[i][j]) {
                        return;
                    }
                }
            }
            //console.log("same");
            this.try_move((way + k) % 4);
        }
        this.state = 'game over';
    },

    get_random_way: function () {
        var idx = Math.floor(Math.random() * 4);
        return idx;
    },

    get_way: function () {
        var rand = Math.floor(Math.random() * 10);

        if (this.gamertype == 'monkey') {
            if (this.level == 'easy') {
                if (rand < 1) {
                    return this.get_random_way();
                }
                else {
                    return this.ai.get_ai_way(this, 0);
                }
            }
            else if (this.level == 'medium') {
                if (rand < 3) {
                    return this.get_random_way();
                }
                else {
                    return this.ai.get_ai_way(this, 0);
                }
            }
            else if (this.level == 'hard') {
                return this.get_random_way();
            }
        }
        else if (this.gamertype == 'ai') {
            if (this.level == 'easy') {
                if (rand < 4) {
                    return this.get_random_way();
                }
                else {
                    return this.ai.get_ai_way(this, 0);
                }
            }
            else if (this.level == 'medium') {
                return this.ai.get_ai_way(this, 0);
            }
            else if (this.level == 'hard') {
                return this.ai.get_ai_way(this, 3);
            }
        }
    },

    is_2048: function () {
        for (var i = 0; i < this.field_size; ++i) {
            for (var j = 0; j < this.field_size; ++j) {
                if (this.scene[i][j] == 2048) return true;
            }
        }
        return false;
    },

    game_step: function (row, col) {
        if (this.scene[row][col] == 0) {
            this.scene[row][col] = this.next_tile;
            this.update_next_tile();
            game.move(game.get_way());

            if (this.gamertype == 'monkey') {
                this.score += this.tmpscore;
            }
            else if (this.gamertype == 'ai') {
                this.score++;
            }
        }

        gui.game_render(this);
    },

    restart: function () {
        this.update_next_tile();
        this.scene = new Array(this.field_size);
        this.score = 0;
        this.tmpscore = 0;
        this.state = 'ok';
        for (var i = 0; i < this.field_size; ++i) {
            this.scene[i] = new Array(this.field_size);
            for (var j = 0; j < this.field_size; ++j) {
                this.scene[i][j] = 0;
            }
        }
        gui.reinitialize(this, leaderboard);
    }
};
