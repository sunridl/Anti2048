$(document).ready(function () {
    game.initialize('ai','easy', 4);
    leaderboard.initialize();
    gui.initialize(game, leaderboard);
});
