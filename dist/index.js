"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RollResultOccurrencesCalculator_1 = __importDefault(require("./RollResultOccurrencesCalculator"));
var rollResultOccurrencesCalculator = new RollResultOccurrencesCalculator_1.default();
exports.calculateRollResultOccurrences = function (_a) {
    var red = _a.red, blue = _a.blue, black = _a.black;
    return rollResultOccurrencesCalculator.calculate(red, blue, black);
};
