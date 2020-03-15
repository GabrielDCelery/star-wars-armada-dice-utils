import { expect } from 'chai';
import { describe, it } from 'mocha';
import { calculateDicePoolRollResultCombinations } from '../src/dice-pool-roll-combinations';

describe('createRollResultPermutationsForDicePool', () => {
  it('should create a map of permutations for a dice pool', () => {
    expect(calculateDicePoolRollResultCombinations({ red: 2, blue: 1, black: 0 })).to.deep.equal({
      total: 512,
      counts: {
        '111': 16,
        '112': 16,
        '113': 24,
        '114': 40,
        '122': 4,
        '123': 16,
        '124': 24,
        '133': 12,
        '134': 40,
        '144': 32,
        '223': 2,
        '224': 2,
        '233': 4,
        '234': 12,
        '244': 8,
        '333': 2,
        '334': 10,
        '344': 16,
        '444': 8,
        '033': 8,
        '034': 24,
        '013': 32,
        '003': 8,
        '004': 8,
        '001': 16,
        '044': 16,
        '014': 48,
        '023': 8,
        '024': 8,
        '012': 16,
        '011': 32,
      },
    });
  });

  it('should do the calculations in less than 70ms', () => {
    const start = new Date().getTime();
    calculateDicePoolRollResultCombinations({ red: 3, blue: 3, black: 0 });
    const end = new Date().getTime();
    const diff = end - start;
    expect(diff < 70).to.equal(true);
  });
});
