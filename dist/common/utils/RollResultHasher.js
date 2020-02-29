"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var URollResultHasher = /** @class */ (function () {
    function URollResultHasher() {
    }
    URollResultHasher.prototype.convertHashToRollResults = function (hash) {
        return hash.split('').map(function (rollResultStr) {
            return parseInt(rollResultStr, 10);
        });
    };
    URollResultHasher.prototype.convertRollResultToHash = function (rollResult) {
        return rollResult.sort().join('');
    };
    return URollResultHasher;
}());
exports.URollResultHasher = URollResultHasher;
