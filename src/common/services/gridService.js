/**
* service.GridService Module
*
* Description
*/
angular.module('service.GridService', [
    'resource.GameData'
])
.factory('GridService', [
    'GameData',
function (
    GameData
){
    var GridService = {};
    GridService.grid = [];

    function getBoardSize() {
        return GameData.gameBoard.boardWidth;
    }

    function getBoardWidth() {
        return GameData.gameBoard.boardWidth;
    }

    function getBoardHeight() {
        return GameData.gameBoard.boardHeight;
    }

    GridService.buildEmptyGameBoard = function buildEmptyGameBoard() {
        var sizeOfBoard = getBoardWidth() * getBoardHeight();
        for (var i = 0; i < sizeOfBoard; i++) {
            GridService.grid[i] = {
                filled: false,
                shape: null
            };
        }
    };

    GridService.getGridService = function getGridService() {
        return GridService.grid;
    };

    GridService.insertPiece = function insertPiece(piece, gameOver) {
        var coordArray = piece.getPieceCoordArray();
        for (var i = 0; i < coordArray.length; i++) {
            var pos = GridService._coordinatesToPosition(coordArray[i]);
            if (GridService.grid[pos].filled) {
                gameOver();
            } else {
                GridService.grid[pos].filled = true;
                GridService.grid[pos].shape = piece.getShape();
            }
        }
    };

    GridService.isPieceVerify = function isPieceVerify(coord) {
        var pos = GridService._coordinatesToPosition(coord);
        if(GridService.grid[pos].filled) {
            return false;
        }
        return true;
    };

    GridService.checkAndClearFilledRow = function checkAndClearFilledRow(cb) {
        for(var i = 0; i < getBoardHeight(); i++) {
            var j = 0;
            for(; j < getBoardWidth(); j++) {
                var pos = GridService._coordinatesToPosition({x: j, y: i});
                if(!GridService.grid[pos].filled) {
                    break;
                }
            }
            if(j === getBoardWidth()) {
                // clear the row
                GridService
                    .clearNthRow(i)
                    .movePieceDownLevel(i);
                cb();
            }
        }
    };

    GridService.clearNthRow = function clearNthRow(row) {
        for(var z = 0; z < getBoardWidth(); z++) {
            var pos = GridService._coordinatesToPosition({x: z, y: row});
            GridService.grid[pos].filled = false;
            GridService.grid[pos].shape = null;
        }
        return GridService;
    };

    GridService.movePieceDownLevel = function movePieceDownLevel(row) {
        for(var i = row - 1; i >= 0; i--) {
            for(var j = 0; j < getBoardWidth(); j++) {
                var curPos = GridService._coordinatesToPosition({x: j, y: i}),
                    nextPos = GridService._coordinatesToPosition({x: j, y: i + 1});
                GridService.grid[nextPos] = angular.copy(GridService.grid[curPos]);
                GridService.grid[curPos].filled = false;
                GridService.grid[curPos].shape = null;
            }
        }
        return GridService;
    };

    GridService._positionToCoordinates = function _positionToCoordinates(i) {
        var x = i % getBoardSize(),
            y = (i - x) / getBoardSize();

        return {
            x: x,
            y: y
        };
    };

    GridService._coordinatesToPosition = function _coordinatesToPosition(pos) {
        return (pos.y * getBoardSize()) + pos.x;
    };

    return GridService;
}]);