/**
* service.Keyboard Module
*
* Description
*/
angular.module('service.Keyboard', [])
.factory('KeyboardService', [
function (
){
    var keyboard = {},
        UP = 'up',
        RIGHT = 'right',
        DOWN = 'down',
        LEFT = 'left',
        SPACE = 'space',
        ESC = 'esc',
        P = 'p',
        keyboardMap = {
            37: LEFT,
            38: UP,
            39: RIGHT,
            40: DOWN,
            32: SPACE,
            27: ESC,
            80: P
        };

    keyboard.init = function init() {
        keyboard.keyEventHandlers = [];
    };

    keyboard.getKey = function getKey(which) {
        return keyboardMap[which];
    };

    keyboard.keydownAction = function keydownAction(event) {
        var key = keyboardMap[event.which];

        if (key) {
            event.preventDefault();
            keyboard._handleKeyEvent(key, event);
        }
    };

    keyboard.on = function on(cb) {
        keyboard.keyEventHandlers.push(cb);
    };

    keyboard._handleKeyEvent = function _handleKeyEvent(key, event) {
        var callbacks = keyboard.keyEventHandlers;
        if (!callbacks) {
            return;
        }

        event.preventDefault();

        if (callbacks) {
            for(var x = 0; x < callbacks.length; x++) {
                var cb = callbacks[x];
                cb(key, event);
            }
        }
    };
    return keyboard;
}]);