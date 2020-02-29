import { EArmadaDice } from '../enums';

export interface IDicePool {
  _padNumOfDices(numOfDices: number): string;
  createUniqueKey(red: number, blue: number, black: number): string;
}

export class UDicePool implements IDicePool {
  _padNumOfDices(numOfDices: number) {
    return Math.abs(numOfDices)
      .toString(10)
      .padStart(2, '0');
  }

  createUniqueKey(red: number, blue: number, black: number) {
    return [
      EArmadaDice.RED_DICE,
      this._padNumOfDices(red),
      EArmadaDice.BLUE_DICE,
      this._padNumOfDices(blue),
      EArmadaDice.BLACK_DICE,
      this._padNumOfDices(black)
    ].join('_');
  }
}
