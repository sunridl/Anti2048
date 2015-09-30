var keyboard_input_handler = function(e) {
    e.preventDefault();

    if (gui.name_editing == true) {
        return;
    }

    var map = {
        //0   48
        /*1*/
        49: 0,
        /*2*/
        50: 1,
        /*3*/
        51: 2,
        /*4*/
        52: 3,
        //5   53
        //6   54
        //7   55
        //8   56
        //9   57
        /*a*/
        65: 8,
        //b   66
        /*c*/
        67: 14,
        /*d*/
        68: 10,
        /*e*/
        69: 6,
        /*f*/
        70: 11,
        //g   71
        //h   72
        //i   73
        //j   74
        //k   75
        //l   76
        //m   77
        //n   78
        //o   79
        //p   80
        /*q*/
        81: 4,
        /*r*/
        82: 7,
        /*s*/
        83: 9,
        //t   84
        //u   85
        /*v*/
        86: 15,
        /*w*/
        87: 5,
        /*x*/
        88: 13,
        //y   89
        /*z*/
        90: 12,

        /*a*/
        97: 8,
        /*c*/
        99: 14,
        /*d*/
        100: 10,
        /*e*/
        101: 6,
        /*f*/
        102: 11,
        /*q*/
        113: 4,
        /*r*/
        114: 7,
        /*s*/
        115: 9,
        /*v*/
        118: 15,
        /*w*/
        119: 5,
        /*x*/
        120: 13,
        /*z*/
        122: 12

    };

    var key = e.keyCode;

    var mapped = map[key];

    if (mapped !== undefined) {
        var row = Math.floor(mapped / 4);
        var col = mapped % 4;

        game.game_step(row, col);
        if (game.state == 'game over') {
            console.log('game over');
        }
    }
    if (key == 78 || key == 100) {
        var row = Math.floor(Math.random() * 4);
        var col = Math.floor(Math.random() * 4);

        game.game_step(row, col);
    }

    if (key == 73 || key == 95) {
        while (game.state != 'game over') {
            var row = Math.floor(Math.random() * 4);
            var col = Math.floor(Math.random() * 4);

            game.game_step(row, col);
        }
    }

};

var cell_click_handler = function(e) {
    e.preventDefault();
    var that = $(this);

    var row = that.data('row');
    var col = that.data('col');
    /*while(true) {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
    */
    game.game_step(row, col);
    //}
};

var player_handler = function(e) {
    e.preventDefault();
    var that = $(this);
    var name = '';
    gui.name_editing = true;

    var list = that;
    $('<input id="name-field" type="text" value="' + that.text() + '"/>').insertAfter(that);
    list.hide();
    $('#name-field').keyup(function(e) {
        var that = $(this);
        var keyCode = e.keyCode || e.which;

        if (keyCode == 13 || keyCode == 27) { // Enter or Escape
            var userName = that.val();
            that.remove();
            $('#player').html("<a>" + userName + "</a>");
            list.show();
            gui.name_editing = false;
        }
    });
    //that.text(name);
};

var level_cell_click_handler = function(e) {
    e.preventDefault();
    var that = $(this);

    if (that.attr('id') == game.level) {
        return;
    }
    //console.log("level clicked");

    $('#' + game.level).removeClass('cell-selected');
    game.level = that.attr('id');
    $('#' + game.level).addClass('cell-selected');
    game.restart();
    gui.game_render(game);
};

var type_cell_click_handler = function(e) {
    e.preventDefault();
    var that = $(this);

    if (that.attr('id') == game.gamertype) {
        return;
    }

    $('#' + game.gamertype).removeClass('cell-selected');
    game.gamertype = that.attr('id');
    $('#' + game.gamertype).addClass('cell-selected');

    game.restart();
    gui.game_render(game);
};

var restart_cell_click_handler = function(e) {
    e.preventDefault();
    var that = $(this);
    //console.log("menu");
    game.restart();
};