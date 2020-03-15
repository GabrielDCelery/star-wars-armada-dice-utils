import { convertHashToRollResult } from './roll-result-hasher';
import { EArmadaDefenseTokens } from './common';

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
}): void => {
  // roll initial dice pool
  // add dice
  // reroll
  // fix dice
  // force reroll
  // cancel dice
  // use defense token
};
