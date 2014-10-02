/**
* service.game Module
*
* Description
*/
angular.module('service.GameManager', [
    'resource.GameData',
    'service.GridService',
    'service.Piece'
])
.factory('GameManager', [
    'GameData',
    'GridService',
    'Piece',
function (
    GameData,
    GridService,
    Piece
){
    var game = {
        currentPiece: null,
        score: 0
    };

    game.newGame = function newGame() {
        GridService.buildEmptyGameBoard();
    };

    game.setGameStart = function setGameStart() {
        GameData.gameStart = !GameData.gameStart;
        return this;
    };

    game.getGameSpeed = function getGameSpeed() {
        return GameData.speed;
    };

    game.setPause = function setPause() {
        GameData.gamePause = !GameData.gamePause;
        return this;
    };

    game.isPause = function isPause() {
        return GameData.gamePause;
    };

    game.isGameStart = function isGameStart() {
        return GameData.gameStart;
    };

    game.getScore = function getScore() {
        return game.score;
    };

    game.getCurrentPiece = function getCurrentPiece() {
        return game.currentPiece;
    };

    game.getCurrentPattern = function getCurrentPattern() {
        return game.currentPiece.getPattern();
    };

    game.getCurrentShape = function getCurrentShape() {
        return game.currentPiece.getShape();
    };

    game.rotatePiece = function rotatePiece() {
        return game.currentPiece.rotatePiece();
    };

    game.getPositionX = function getPositionX() {
        return game.currentPiece.getPositionX();
    };

    game.getPositionY = function getPositionY() {
        return game.currentPiece.getPositionY();
    };

    function insertAndClearRow() {
        game.insertPiece();
        GridService.checkAndClearFilledRow(function() {
            game.score += 100;
        });
    }

    game.moveCurrentPiece = function moveCurrentPiece() {
        var speedY = game.getPositionY() + 1;
        game.currentPiece.updatePosition({
            y: speedY
        }, insertAndClearRow);
    };

    game.insertPiece = function insertPiece() {
        GridService.insertPiece(game.currentPiece);
        game.currentPiece.destroy();
        game.currentPiece = null;
    };

    game.createNewPiece = function createNewPiece() {
        game.currentPiece = new Piece({
            x: 4,
            y: 0
        });
    };

    game.movePieceInLevel = function movePieceInLevel(direction) {
        var velocity = (direction === 'left') ? -1 : 1;
            speedX = game.getPositionX() + velocity;
        game.currentPiece.updatePosition({
            x: speedX
        });
    };

    game.hardDrop = function hardDrop() {
        var cell = game.currentPiece.calculateCollisionPoint();
        game.currentPiece.updatePosition(cell, insertAndClearRow);
    };

    game.move = function move(key) {
        switch(key) {
            case 'up': game.rotatePiece();
                break;
            case 'left': game.movePieceInLevel('left');
                break;
            case 'right': game.movePieceInLevel('right');
                break;
            case 'down': game.moveCurrentPiece();
                break;
            case 'space': game.hardDrop();
                break;
            case 'p':
            case 'esc': game.setPause();
                break;
            default:
                break;
        }
    };
    
    return game;
}]);