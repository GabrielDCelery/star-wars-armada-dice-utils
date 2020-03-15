import { TRollResultCounts, EArmadaDice, EArmadaDiceSide } from './common';
import { diceRollSideCountsConfig } from './configs';
import { appendDiceSideToGroupedRollResultHash } from './roll-result-hasher';

export interface IDicePoolRollResultCombinations {
  total: number;
  counts: TRollResultCounts;
}

const appendDiceToRollResultCounts = (
  oldCounts: TRollResultCounts,
  dice: EArmadaDice
): IDicePoolRollResultCombinations => {
  let total = 0;
  const newCounts: TRollResultCounts = {};
  const rollResultHashes = Object.keys(oldCounts);
  const diceSides = Object.keys(diceRollSideCountsConfig[dice]) as EArmadaDiceSide[];

  rollResultHashes.forEach(rollResultHash => {
    diceSides.forEach(diceSide => {
      const combinedRollResultHash = appendDiceSideToGroupedRollResultHash({
        hash: rollResultHash,
        dice,
        diceSide,
      });

      if (newCounts[combinedRollResultHash] === undefined) {
        newCounts[combinedRollResultHash] = 0;
      }

      const newCount = oldCounts[rollResultHash] * diceRollSideCountsConfig[dice][diceSide];

      total += newCount;
      newCounts[combinedRollResultHash] += newCount;
    });
  });

  return {
    total: total,
    counts: newCounts,
  };
};

export const calculateDicePoolRollResultCombinations = ({
  red,
  blue,
  black,
}: {
  red: number;
  blue: number;
  black: number;
}): IDicePoolRollResultCombinations => {
  let dicePoolRollResultCombinations: IDicePoolRollResultCombinations = {
    total: 0,
    counts: { __: 1 },
  };

  for (let i = 0, iMax = red; i < iMax; i++) {
    dicePoolRollResultCombinations = appendDiceToRollResultCounts(
      dicePoolRollResultCombinations.counts,
      EArmadaDice.RED_DICE
    );
  }

  for (let i = 0, iMax = blue; i < iMax; i++) {
    dicePoolRollResultCombinations = appendDiceToRollResultCounts(
      dicePoolRollResultCombinations.counts,
      EArmadaDice.BLUE_DICE
    );
  }

  for (let i = 0, iMax = black; i < iMax; i++) {
    dicePoolRollResultCombinations = appendDiceToRollResultCounts(
      dicePoolRollResultCombinations.counts,
      EArmadaDice.BLACK_DICE
    );
  }

  return dicePoolRollResultCombinations;
};
