var leaderboard = {
    map: {
        'monkeyeasy': [],
        'monkeymedium': [],
        'monkeyhard': [],
        'aieasy': [],
        'aimedium': [],
        'aihard': [],
    },

    initialize: function () {
        var create = function () {
            var a = new Array(10);
            for (var i = 0; i < 10; ++i) {
                a[i] = { 'player': 'unknown', 'score': 0 };
            }
            return a;
        };
        this.map['monkeyeasy'] = create();
        this.map['monkeymedium'] = create();
        this.map['monkeyhard'] = create();
        this.map['aieasy'] = create();
        this.map['aimedium'] = create();
        this.map['aihard'] = create();
    },

    add_line: function (gamertype, level, player, score) {
        //console.log(gamertype);
        if (gamertype == 'monkey') {
           if (this.map[gamertype + level][9].score < score) {
                for (var i = 8; i >= 0; --i) {
                    if (this.map[gamertype + level][i].score < score) {
                        this.map[gamertype + level][i + 1].score = this.map[gamertype + level][i].score;
                        this.map[gamertype + level][i + 1].player = this.map[gamertype + level][i].player;
                    }
                    else {
                        this.map[gamertype + level][i + 1].score = score;
                        this.map[gamertype + level][i + 1].player = player;
                        //console.log('place ', i + 1);
                        return;
                    }
                }
                this.map[gamertype + level][0].score = score;
                this.map[gamertype + level][0].player = player;

            }
            //console.log("??");
        }
        else if (gamertype == 'ai') {
           if (this.map[gamertype + level][9].score > score || this.map[gamertype + level][9].score == 0) {
                for (var i = 8; i >= 0; --i) {
                    if (this.map[gamertype + level][i].score > score || this.map[gamertype + level][i].score == 0) {
                        this.map[gamertype + level][i + 1].score = this.map[gamertype + level][i].score;
                        this.map[gamertype + level][i + 1].player = this.map[gamertype + level][i].player;
                    }
                    else {
                        this.map[gamertype + level][i + 1].score = score;
                        this.map[gamertype + level][i + 1].player = player;
                        return;
                    }
                }
                this.map[gamertype + level][0].score = score;
                this.map[gamertype + level][0].player = player;
           }
        }
    },
};
