var initialize_gui = function (game) {
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

    $('#viewport').html($(code));
    $('.game-cell').click(cell_click_handler);
};

var game_render = function (game) {
    var code = '<table class="game-field text-center">\n';
    for (var i = 0; i < game.field_size; ++i) {
        code += "  <tr>\n";
        for (var j = 0; j < game.field_size; ++j) {
          //  console.log(game.scene[i][j]);
            code += '    <td class="game-cell cell-'+ game.scene[i][j] +'" data-row="' + i + '" data-col="' + j + '"></td>\n';
            //code += '    <td class="game-cell cell-0 row' + i + ' col' + j + '"></td>\n';
        }
        code += "  </tr>\n";
    }
    code += "</table>";

    $('#viewport').html($(code));
    $('.game-cell').click(cell_click_handler);
};

$(document).ready(function () {
    game.initialize('ai','easy', 4);

    initialize_gui(game);
    $(document).keyup(keyboard_input_handler);

    game_render(game);
});
