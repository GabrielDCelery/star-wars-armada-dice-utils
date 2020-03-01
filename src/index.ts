import RollResultOccurrencesCalculator from './RollResultOccurrencesCalculator';
import { EArmadaDiceSide, URollResultHasher } from './common';

export class StarWarsArmadaDiceUtils {
  private isLoggingEnabled: boolean;

  constructor({ logging }: { logging?: boolean } = {}) {
    this.isLoggingEnabled = logging || false;
    this.createRollResultPermutationsForDicePool = this.createRollResultPermutationsForDicePool.bind(
      this
    );
  }

  static get DICE_SIDE() {
    return EArmadaDiceSide;
  }

  public createRollResultPermutationsForDicePool({
    red,
    blue,
    black
  }: {
    red: number;
    blue: number;
    black: number;
  }) {
    return new RollResultOccurrencesCalculator({
      isLoggingEnabled: this.isLoggingEnabled
    }).calculate(red, blue, black);
  }

  public convertHashToRollResult(hash: string) {
    return new URollResultHasher().convertHashToRollResult(hash);
  }

  public convertRollResultToHash(rollResult: EArmadaDiceSide[]): string {
    return new URollResultHasher().convertRollResultToHash(rollResult);
  }
}
