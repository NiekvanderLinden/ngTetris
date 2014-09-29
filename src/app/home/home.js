angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'direcitve.diGameBoard',
  'service.GameManager',
  'service.animframePolyFill',
  'service.Keyboard'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})
.controller('HomeCtrl', [
    '$scope',
    'GameManager',
    'animframePolyFill',
    'KeyboardService',
function HomeController(
    $scope,
    GameManager,
    animframePolyFill,
    KeyboardService
){
    var loop = _.throttle(gameLoop, GameManager.getGameSpeed(), {
            leading: false,
            trailing: false
        });

    function gameLoop() {
        GameManager.moveCurrentPiece();
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $scope.gameOn = function gameOn() {
        var self = this;
        window.requestAnimationFrame(function () {
            self.gameOn();
        });
        if(!GameManager.isPause() && GameManager.isGameStart()) {
            loop();
            $scope.$broadcast('GameOn');
        }
    };

    $scope.newGame = function newGame() {
        KeyboardService.init();
        GameManager.newGame();
        return this;
    };

    $scope.startNewGame = function startNewGame() {
        GameManager.setGameStart();
        KeyboardService.on(function(key) {
            GameManager.move(key);
        });
        $scope.gameOn();
        return this;
    };

    $scope.isGameStart = function isGameStart() {
        return GameManager.isGameStart();
    };

    $scope.pauseGame = function pauseGame() {
        GameManager.setPause();
        return this;
    };

    $scope.isPause = function isPause() {
        return GameManager.isPause();
    };

    $scope.continueGame = function continueGame() {
        GameManager.setPause();
        return this;
    };

    $scope.getScore = function getScore() {
        return GameManager.getScore();
    };

    $scope.newGame();
}]);