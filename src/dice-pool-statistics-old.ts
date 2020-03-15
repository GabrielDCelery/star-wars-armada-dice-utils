import {
  calculateDicePoolRollResultCombinations,
  IDicePoolRollResultCombinations,
} from './dice-pool-roll-combinations-old';
import { convertHashToRollResult } from './roll-result-hasher';
import { diceDamageShipConfig } from './configs';
import { EArmadaDiceSide, EArmadaDefenseTokens } from './common';

export interface IDicePoolStatistics {
  dicePool: {
    red: number;
    blue: number;
    black: number;
  };
  statistics: [];
}

export interface IRollResultAnalysis {
  damage: number;
  accuracies: number;
  criticals: number;
}

const createRollResultAnalysis = (rollResult: EArmadaDiceSide[]): IRollResultAnalysis => {
  const result = {
    damage: 0,
    accuracies: 0,
    criticals: 0,
  };

  rollResult.forEach(diceSide => {
    const damage = diceDamageShipConfig[diceSide];
    result.damage += damage;
    result.accuracies += diceSide === EArmadaDiceSide.ACCURACY ? 1 : 0;
    result.criticals +=
      diceSide === EArmadaDiceSide.CRITICAL || diceSide === EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT
        ? 1
        : 0;
  });

  return result;
};

export const calculateDicePoolStatistics = ({
  red,
  blue,
  black,
  defenseTokens = [],
}: {
  red: number;
  blue: number;
  black: number;
  defenseTokens: EArmadaDefenseTokens[];
}): IDicePoolStatistics => {
  const dicePoolRollResultCombinations: IDicePoolRollResultCombinations = calculateDicePoolRollResultCombinations(
    {
      red,
      blue,
      black,
    }
  );

  const statistics = [{ defenseTokens: [EArmadaDefenseTokens.NONE] }];
  const rollResultHashes = Object.keys(dicePoolRollResultCombinations.counts);

  let totalDamage = 0;
  let totalDamageAgainstBrace = 0;
  let totalDamageAgainstScatter = 0;

  rollResultHashes.forEach(rollResultHash => {
    const count = dicePoolRollResultCombinations.counts[rollResultHash];
    const rollResult = convertHashToRollResult(rollResultHash);
    const { damage, accuracies, criticals } = createRollResultAnalysis(rollResult);

    console.log(criticals);

    totalDamage += damage * count;
    totalDamageAgainstBrace += Math.ceil(damage / 2) * count;
    totalDamageAgainstScatter += accuracies === 0 ? 0 : damage * count;
  });

  const result = {
    averageDamage: totalDamage / dicePoolRollResultCombinations.total,
    averageDamageAgainstBrace: totalDamageAgainstBrace / dicePoolRollResultCombinations.total,
    averageDamageAgainstScatter: totalDamageAgainstScatter / dicePoolRollResultCombinations.total,
  };

  console.log({ dicePool: { red, blue, black }, statistics: [] });

  return { dicePool: { red, blue, black }, statistics: [] };
};
