/**
* directive.diPiece Module
*
* Description
*/
angular.module('directive.diPiece', [
    'service.GameManager',
    'resource.GameData'
])
.controller('PieceCtrl', [
    '$scope',
    'GameManager',
    'GameData',
function (
    $scope,
    GameManager,
    GameData
){
    var getX = _.memoize(function(x) { 
           return x * GameData.gameBoard.pieceWidthInPixel + GameData.gameBoard.borderWidth;
        }),
        getY = _.memoize(function (y) {
            return y * GameData.gameBoard.pieceWidthInPixel;
        });

    function getPattern() {
        return GameManager.getCurrentPattern();
    }

    function getPiece() {
        return GameManager.getCurrentPiece();
    }

    function getPositionX () {
        return GameManager.getPositionX();
    }

    function getPositionY() {
        return GameManager.getPositionY();
    }

    $scope.pieces = _.range(16);

    // if sequence is match, then highlight the DOM ele
    $scope.checkPattern = function checkPattern(piece) {
        var res = _.find(getPattern(), function (p) {
            return piece === p;
        });
        return _.isNumber(res);
    };

    $scope.getClassForShape = function getClassForShape() {
        var pieceClass = '';
        switch(GameManager.getCurrentShape()) {
            case 0: pieceClass = 'dy-L';
                break;
            case 1: pieceClass = 'dy-O';
                break;
            case 2: pieceClass = 'dy-I';
                break;
            case 3: pieceClass = 'dy-T';
                break;
            case 4: pieceClass = 'dy-J';
                break;
            case 5: pieceClass = 'dy-S';
                break;
            case 6: pieceClass = 'dy-Z';
                break;
        }   
        return pieceClass;
    };

    this.getLeft = function getLeft() {
        return getX(getPositionX());
    };

    this.getTop = function getTop() {
        return getY(getPositionY());
    };
}])
.directive('diPiece', [
function(
){
    var Piece = {};

    Piece.controller = 'PieceCtrl';
    
    Piece.templateUrl = 'directives/diPiece/diPiece.tpl.html';

    Piece.restrict = 'A';

    Piece.replace = true;

    Piece.scope = true;

    Piece.link = function link(scope, element, attrs, controller) {
        element.css('left', controller.getLeft() + 'px');
        scope.$on('GameOn', function () {
            var top = controller.getTop(),
                left = controller.getLeft();
            element.css('left', left + 'px');
            element.css('top', Math.round(top) + 'px');
        });
    };

    return Piece;
}]);