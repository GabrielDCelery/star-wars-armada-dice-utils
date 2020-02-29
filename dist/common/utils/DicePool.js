"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../enums");
var UDicePool = /** @class */ (function () {
    function UDicePool() {
    }
    UDicePool.prototype._padNumOfDices = function (numOfDices) {
        return Math.abs(numOfDices)
            .toString(10)
            .padStart(2, '0');
    };
    UDicePool.prototype.createUniqueKey = function (red, blue, black) {
        return [
            enums_1.EArmadaDice.RED_DICE,
            this._padNumOfDices(red),
            enums_1.EArmadaDice.BLUE_DICE,
            this._padNumOfDices(blue),
            enums_1.EArmadaDice.BLACK_DICE,
            this._padNumOfDices(black)
        ].join('_');
    };
    return UDicePool;
}());
exports.UDicePool = UDicePool;
