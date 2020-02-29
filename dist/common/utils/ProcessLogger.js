"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UProcessLogger = /** @class */ (function () {
    function UProcessLogger() {
        this.lastCachedPercentage = 0;
        this.totalNumOfItems = 0;
    }
    UProcessLogger.prototype.setTotalNumOfProcessableItems = function (totalNumOfItems) {
        this.totalNumOfItems =
            typeof totalNumOfItems === 'string'
                ? parseInt(totalNumOfItems)
                : totalNumOfItems;
        return this;
    };
    UProcessLogger.prototype.printMessage = function (message) {
        process.stdout.write(message + "\r\n\"");
    };
    UProcessLogger.prototype.printPercentage = function (processedNumOfItems) {
        var currentPercentage = Math.floor((processedNumOfItems / this.totalNumOfItems) * 100);
        if (this.lastCachedPercentage !== currentPercentage) {
            process.stdout.write(currentPercentage + "% \r\"");
        }
        this.lastCachedPercentage = currentPercentage;
    };
    return UProcessLogger;
}());
exports.UProcessLogger = UProcessLogger;
