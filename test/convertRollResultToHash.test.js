const expect = require('chai').expect;
const { StarWarsArmadaDiceUtils } = require('../dist/index.js');
const swadu = new StarWarsArmadaDiceUtils({ logging: false });

describe('convertRollResultToHash', () => {
  it('converts a roll result to a hash', () => {
    expect(
      swadu.convertRollResultToHash([
        StarWarsArmadaDiceUtils.DICE_SIDE.SINGLE_HIT,
        StarWarsArmadaDiceUtils.DICE_SIDE.BLANK
      ])
    ).to.deep.equal('01');
  });
});
