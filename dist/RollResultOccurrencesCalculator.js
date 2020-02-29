"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var configs_1 = require("./configs");
var RollResultOccurrencesCalculator = /** @class */ (function () {
    function RollResultOccurrencesCalculator() {
    }
    RollResultOccurrencesCalculator.createInstance = function () {
        return new RollResultOccurrencesCalculator();
    };
    RollResultOccurrencesCalculator.prototype._createArrayOfType = function (type, numOfDices) {
        return new Array(numOfDices).fill(type);
    };
    RollResultOccurrencesCalculator.prototype._convertDicePoolToFlatArray = function (numOfRedDice, numOfBlueDice, numOfBlackDice) {
        return __spreadArrays(this._createArrayOfType(common_1.EArmadaDice.RED_DICE, numOfRedDice), this._createArrayOfType(common_1.EArmadaDice.BLUE_DICE, numOfBlueDice), this._createArrayOfType(common_1.EArmadaDice.BLACK_DICE, numOfBlackDice));
    };
    RollResultOccurrencesCalculator.prototype._convertDiceArrayToDiceSidesArray = function (diceArray) {
        return diceArray.map(function (dice) { return configs_1.diceSideConfig[dice].sort(); });
    };
    RollResultOccurrencesCalculator.prototype._getNumOfDicePermutations = function (numOfDices) {
        return Math.pow(8, numOfDices);
    };
    RollResultOccurrencesCalculator.prototype._appendHashToHashMap = function (hashMap, hash) {
        if (hashMap[hash] === undefined) {
            hashMap[hash] = 0;
        }
        hashMap[hash]++;
    };
    RollResultOccurrencesCalculator.prototype._getRollResult = function (dicePermutationId, dicePermutationBoundaries, diceSidesArray) {
        var perumationId = dicePermutationId;
        return dicePermutationBoundaries.map(function (boundary, diceIndex) {
            var diceSideIndex = Math.floor(perumationId / boundary);
            perumationId = perumationId - diceSideIndex * boundary;
            return diceSidesArray[diceIndex][diceSideIndex];
        });
    };
    RollResultOccurrencesCalculator.prototype._getNumOfDices = function (red, blue, black) {
        return red + blue + black;
    };
    RollResultOccurrencesCalculator.prototype.isValid = function (red, blue, black, jsonData) {
        if (jsonData === null || jsonData === undefined) {
            return false;
        }
        var diceCombinationValues = Object.values(jsonData);
        var totalNumOfDicePermutations = this._getNumOfDicePermutations(this._getNumOfDices(red, blue, black));
        return (totalNumOfDicePermutations ===
            diceCombinationValues.reduce(function (a, b) { return a + b; }, 0));
    };
    RollResultOccurrencesCalculator.prototype.calculate = function (red, blue, black) {
        var processLogger = new common_1.UProcessLogger();
        var rollResultHasher = new common_1.URollResultHasher();
        var diceArray = this._convertDicePoolToFlatArray(red, blue, black);
        var diceSidesArray = this._convertDiceArrayToDiceSidesArray(diceArray);
        var dicePermutationBoundaries = new Array(this._getNumOfDices(red, blue, black))
            .fill(null)
            .map(function (v, index) {
            return Math.pow(8, index);
        })
            .reverse();
        var totalNumOfDicePermutations = this._getNumOfDicePermutations(this._getNumOfDices(red, blue, black));
        processLogger.setTotalNumOfProcessableItems(totalNumOfDicePermutations);
        var hashMap = {};
        processLogger.printMessage("Calculating result occurrences for red: " + red + ", blue: " + blue + ", black: " + black);
        for (var i = 0, iMax = totalNumOfDicePermutations; i < iMax; i++) {
            var rollResult = this._getRollResult(i, dicePermutationBoundaries, diceSidesArray);
            var hash = rollResultHasher.convertRollResultToHash(rollResult);
            this._appendHashToHashMap(hashMap, hash);
            processLogger.printPercentage(i);
        }
        return hashMap;
    };
    return RollResultOccurrencesCalculator;
}());
exports.default = RollResultOccurrencesCalculator;
