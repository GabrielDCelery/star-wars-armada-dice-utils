import {
  EArmadaDice,
  EArmadaDiceSide,
  TArmadaDiceSides,
  URollResultHasher,
  UProcessLogger
} from './common';
import { diceSideConfig } from './configs';

interface IRollResultOccurrencesCalculator {
  _createArrayOfType(type: EArmadaDice, numOfDices: number): EArmadaDice[];
  _convertDicePoolToFlatArray(
    numOfRedDice: number,
    numOfBlueDice: number,
    numOfBlackDice: number
  ): EArmadaDice[];
  _convertDiceArrayToDiceSidesArray(
    diceArray: EArmadaDice[]
  ): TArmadaDiceSides[];
  _getNumOfDicePermutations(numOfDices: number): number;
  _getNumOfDices(red: number, blue: number, black: number): number;
  _appendHashToHashMap(hashMap: any, hash: string): void;
  _getRollResult(
    dicePermutationId: number,
    dicePermutationBoundaries: number[],
    diceSidesArray: TArmadaDiceSides[]
  ): EArmadaDiceSide[];
  isValid(red: number, blue: number, black: number, jsonData: any): boolean;
  calculate(red: number, blue: number, black: number): any;
}

class RollResultOccurrencesCalculator
  implements IRollResultOccurrencesCalculator {
  private isLoggingEnabled: boolean;

  constructor({ isLoggingEnabled }: { isLoggingEnabled: boolean }) {
    this.isLoggingEnabled = isLoggingEnabled;
  }

  _createArrayOfType(type: EArmadaDice, numOfDices: number): EArmadaDice[] {
    return new Array(numOfDices).fill(type);
  }

  _convertDicePoolToFlatArray(
    numOfRedDice: number,
    numOfBlueDice: number,
    numOfBlackDice: number
  ): EArmadaDice[] {
    return [
      ...this._createArrayOfType(EArmadaDice.RED_DICE, numOfRedDice),
      ...this._createArrayOfType(EArmadaDice.BLUE_DICE, numOfBlueDice),
      ...this._createArrayOfType(EArmadaDice.BLACK_DICE, numOfBlackDice)
    ];
  }

  _convertDiceArrayToDiceSidesArray(
    diceArray: EArmadaDice[]
  ): TArmadaDiceSides[] {
    return diceArray.map(dice => diceSideConfig[dice].sort());
  }

  _getNumOfDicePermutations(numOfDices: number) {
    return Math.pow(8, numOfDices);
  }

  _appendHashToHashMap(hashMap: any, hash: string) {
    if (hashMap[hash] === undefined) {
      hashMap[hash] = 0;
    }

    hashMap[hash]++;
  }

  _getRollResult(
    dicePermutationId: number,
    dicePermutationBoundaries: number[],
    diceSidesArray: TArmadaDiceSides[]
  ): EArmadaDiceSide[] {
    let perumationId = dicePermutationId;

    return dicePermutationBoundaries.map((boundary, diceIndex) => {
      let diceSideIndex = Math.floor(perumationId / boundary);
      perumationId = perumationId - diceSideIndex * boundary;

      return diceSidesArray[diceIndex][diceSideIndex];
    });
  }

  _getNumOfDices(red: number, blue: number, black: number) {
    return red + blue + black;
  }

  isValid(red: number, blue: number, black: number, jsonData: any) {
    if (jsonData === null || jsonData === undefined) {
      return false;
    }

    const diceCombinationValues: number[] = Object.values(jsonData);
    const totalNumOfDicePermutations: number = this._getNumOfDicePermutations(
      this._getNumOfDices(red, blue, black)
    );

    return (
      totalNumOfDicePermutations ===
      diceCombinationValues.reduce((a, b) => a + b, 0)
    );
  }

  calculate(red: number, blue: number, black: number) {
    const processLogger = new UProcessLogger({
      isEnabled: this.isLoggingEnabled
    });
    const rollResultHasher: URollResultHasher = new URollResultHasher();
    const diceArray: EArmadaDice[] = this._convertDicePoolToFlatArray(
      red,
      blue,
      black
    );
    const diceSidesArray: TArmadaDiceSides[] = this._convertDiceArrayToDiceSidesArray(
      diceArray
    );
    const dicePermutationBoundaries: number[] = new Array(
      this._getNumOfDices(red, blue, black)
    )
      .fill(null)
      .map((v, index) => {
        return Math.pow(8, index);
      })
      .reverse();
    const totalNumOfDicePermutations: number = this._getNumOfDicePermutations(
      this._getNumOfDices(red, blue, black)
    );

    processLogger.setTotalNumOfProcessableItems(totalNumOfDicePermutations);

    const hashMap = {};

    processLogger.printMessage(
      `Calculating result occurrences for red: ${red}, blue: ${blue}, black: ${black}`
    );

    for (let i = 0, iMax = totalNumOfDicePermutations; i < iMax; i++) {
      const rollResult: EArmadaDiceSide[] = this._getRollResult(
        i,
        dicePermutationBoundaries,
        diceSidesArray
      );
      const hash: string = rollResultHasher.convertRollResultToHash(rollResult);

      this._appendHashToHashMap(hashMap, hash);
      processLogger.printPercentage(i);
    }

    return hashMap;
  }
}

export default RollResultOccurrencesCalculator;
