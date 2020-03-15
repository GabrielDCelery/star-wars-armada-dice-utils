import { expect } from 'chai';
import { describe, it } from 'mocha';
import { diceRollSideCountsConfig } from '../src/configs';
import { EArmadaDice, EArmadaDiceSide } from '../src/common';

describe('dice configs', () => {
  it('get the right dice side occurrences configuration', () => {
    expect(diceRollSideCountsConfig).to.deep.equal({
      [EArmadaDice.RED_DICE]: {
        [EArmadaDiceSide.ACCURACY]: 1,
        [EArmadaDiceSide.BLANK]: 2,
        [EArmadaDiceSide.CRITICAL]: 2,
        [EArmadaDiceSide.DOUBLE_HIT]: 1,
        [EArmadaDiceSide.SINGLE_HIT]: 2,
      },
      [EArmadaDice.BLUE_DICE]: {
        [EArmadaDiceSide.ACCURACY]: 2,
        [EArmadaDiceSide.CRITICAL]: 2,
        [EArmadaDiceSide.SINGLE_HIT]: 4,
      },
      [EArmadaDice.BLACK_DICE]: {
        [EArmadaDiceSide.BLANK]: 2,
        [EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT]: 2,
        [EArmadaDiceSide.SINGLE_HIT]: 4,
      },
    });
  });
});
