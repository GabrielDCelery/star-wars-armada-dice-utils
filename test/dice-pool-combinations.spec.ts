import { expect } from 'chai';
import { describe, it } from 'mocha';
import { calculateDicePoolRollResultCombinations } from '../src/dice-pool-roll-combinations';

describe('createRollResultPermutationsForDicePool', () => {
  it('should create a map of permutations for a dice pool', () => {
    expect(calculateDicePoolRollResultCombinations({ red: 2, blue: 1, black: 0 })).to.deep.equal({
      total: 512,
      counts: {
        '33_3_': 2,
        '33_4_': 2,
        '33_1_': 4,
        '03_3_': 8,
        '03_4_': 8,
        '03_1_': 16,
        '34_3_': 8,
        '34_4_': 8,
        '34_1_': 16,
        '23_3_': 4,
        '23_4_': 4,
        '23_1_': 8,
        '13_3_': 8,
        '13_4_': 8,
        '13_1_': 16,
        '00_3_': 8,
        '00_4_': 8,
        '00_1_': 16,
        '04_3_': 16,
        '04_4_': 16,
        '04_1_': 32,
        '02_3_': 8,
        '02_4_': 8,
        '02_1_': 16,
        '01_3_': 16,
        '01_4_': 16,
        '01_1_': 32,
        '44_3_': 8,
        '44_4_': 8,
        '44_1_': 16,
        '24_3_': 8,
        '24_4_': 8,
        '24_1_': 16,
        '14_3_': 16,
        '14_4_': 16,
        '14_1_': 32,
        '22_3_': 2,
        '22_4_': 2,
        '22_1_': 4,
        '12_3_': 8,
        '12_4_': 8,
        '12_1_': 16,
        '11_3_': 8,
        '11_4_': 8,
        '11_1_': 16,
      },
    });
  });
});
