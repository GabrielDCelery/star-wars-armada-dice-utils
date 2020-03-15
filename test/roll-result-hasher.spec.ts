import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  convertHashToRollResult,
  convertRollResultToHash,
  appendDiceSideToGroupedRollResultHash,
} from '../src/roll-result-hasher';
import { EArmadaDice, EArmadaDiceSide } from '../src/common';

describe('roll result hasher', () => {
  it('converts single hashes correctly to roll results', () => {
    expect(convertHashToRollResult('0')).to.deep.equal([EArmadaDiceSide.BLANK]);
    expect(convertHashToRollResult('1')).to.deep.equal([EArmadaDiceSide.SINGLE_HIT]);
    expect(convertHashToRollResult('2')).to.deep.equal([EArmadaDiceSide.DOUBLE_HIT]);
    expect(convertHashToRollResult('3')).to.deep.equal([EArmadaDiceSide.ACCURACY]);
    expect(convertHashToRollResult('4')).to.deep.equal([EArmadaDiceSide.CRITICAL]);
    expect(convertHashToRollResult('5')).to.deep.equal([EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT]);
  });

  it('converts long hashes correctly to roll results', () => {
    expect(convertHashToRollResult('012345')).to.deep.equal([
      EArmadaDiceSide.BLANK,
      EArmadaDiceSide.SINGLE_HIT,
      EArmadaDiceSide.DOUBLE_HIT,
      EArmadaDiceSide.ACCURACY,
      EArmadaDiceSide.CRITICAL,
      EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT,
    ]);
  });

  it('converts all single roll result to a hash', () => {
    expect(convertRollResultToHash([EArmadaDiceSide.BLANK])).to.deep.equal('0');
    expect(convertRollResultToHash([EArmadaDiceSide.SINGLE_HIT])).to.deep.equal('1');
    expect(convertRollResultToHash([EArmadaDiceSide.DOUBLE_HIT])).to.deep.equal('2');
    expect(convertRollResultToHash([EArmadaDiceSide.ACCURACY])).to.deep.equal('3');
    expect(convertRollResultToHash([EArmadaDiceSide.CRITICAL])).to.deep.equal('4');
    expect(convertRollResultToHash([EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT])).to.deep.equal('5');
  });

  it('appends dice side to grouped roll result hash', () => {
    expect(
      appendDiceSideToGroupedRollResultHash({
        hash: '__',
        dice: EArmadaDice.RED_DICE,
        diceSide: EArmadaDiceSide.SINGLE_HIT,
      })
    ).to.deep.equal('1__');
  });
});
