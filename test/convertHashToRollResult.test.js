const expect = require('chai').expect;
const { StarWarsArmadaDiceUtils } = require('../dist/index.js');
const swadu = new StarWarsArmadaDiceUtils({ logging: false });

describe('convertHashToRollResult.test', () => {
  it('converts a hash to roll result', () => {
    expect(swadu.convertHashToRollResult('133')).to.deep.equal([
      'SINGLE_HIT',
      'ACCURACY',
      'ACCURACY'
    ]);
  });
});
