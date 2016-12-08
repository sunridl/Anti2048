var gui = {
    menu : null,
    viewport: null,
    leaderboard: null,
    table: null,
    name_editing: false,

    make_panel : function(game) {
        var code = '<table class="game-panel text-center">\n';
        code += "  <tr>\n";
        code += '    <td id="next-tile" class="game-cell cell-'+ game.next_tile + '"></td>\n';
        code += '    <td id="score" class="game-score">Score: '+ game.score +'</td>\n';
        code += "  </tr>\n";
        code += "</table>";
        code += "<br>";
        return code;
    },

    make_game_field : function(game) {
        var code = '<table class="game-field text-center">\n';
        for (var i = 0; i < game.field_size; ++i) {
            code += "  <tr>\n";
            for (var j = 0; j < game.field_size; ++j) {
               // console.log(game.scene[i][j]);
                code += '    <td class="game-cell cell-'+ game.scene[i][j] +'" data-row="' + i + '" data-col="' + j + '"></td>\n';
                //code += '    <td class="game-cell cell-0 row' + i + ' col' + j + '"></td>\n';
            }
            code += "  </tr>\n";
        }
        code += "</table>";
        return code;
    },

    make_viewport : function(game) {
        return this.make_panel(game) + this.make_game_field(game);
    },

    make_leaderbord : function(leaderboard, game) {
        var code = '';

        for (var i = 0; i < 10; ++i) {
            code += '  <tr>';
            code += '    <td>' + (i + 1) + '</td>';
            //console.log(this.map[gamertype + level][i]);
            code += '    <td>' + leaderboard.map[game.gamertype + game.level][i].player + '</td>';
            code += '    <td>' + leaderboard.map[game.gamertype + game.level][i].score + '</td>';
            code += '  </tr>';
        }
        return code;

    },

    attach_handlers : function() {
        $('.game-cell').click(cell_click_handler);
        $('.level-cell').click(level_cell_click_handler);
        $('.type-cell').click(type_cell_click_handler);
        $('.restart-cell').click(restart_cell_click_handler);
        $(document).keyup(keyboard_input_handler);

    },

    initialize : function(game, leaderboard) {
        $('#viewport').html($(this.make_viewport(game)));
        $('#'+game.gamertype).addClass('cell-selected');
        $('#'+game.level).addClass('cell-selected');
        this.set_table(game);
        this.game_render(game);

        $('#leaderboard').html($(this.make_leaderbord(leaderboard, game)));
        this.attach_handlers();
        $('#player').click(player_handler);

    },

    reinitialize : function(game, leaderboard) {
        $('#viewport').html($(this.make_viewport(game)));
        this.set_table(game);
        this.game_render(game);
        $('#leaderboard').html($(this.make_leaderbord(leaderboard, game)));
        this.attach_handlers();
    },

    game_over_text : function(game) {
        var code = '<div class="game-over">';
        code += '<div>Game over!</div>';
        code += '<div>For a new game press restart</div>';
        code += '</div>';
        return code + this.make_viewport(game);
    },

    game_over : function(game, leaderboard) {
        $('#viewport').html($(this.game_over_text(game)));
        leaderboard.add_line(game.gamertype, game.level, $('#player').text(), game.score);
        console.log('game over');
        $('#leaderboard').html($(this.make_leaderbord(leaderboard, game)));
    },

    set_table : function(game) {
        var table = new Array(game.field_size);
        for (var i = 0; i < game.field_size; ++i) {
            table[i] = new Array(game.field_size);
            for (var j = 0; j < game.field_size; ++j) {
                table[i][j] = $('.game-cell[data-row="' + i +  '"][data-col="' + j + '"]')[0];
            }
        }

        this.table = table;
    },

    game_render : function(game) {
        $("#next-tile").attr('class', 'game-cell cell-' + game.next_tile);
        $("#score").text('Score: ' + game.score);

        for (var i = 0; i < game.field_size; ++i) {
            for (var j = 0; j < game.field_size; ++j) {
                $(this.table[i][j]).attr('class', 'game-cell cell-' + game.scene[i][j]);
            }
        }

        if (game.state == 'game over') {
            this.game_over(game, leaderboard);
        }
    }
};