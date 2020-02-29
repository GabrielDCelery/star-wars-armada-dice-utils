import { EArmadaDiceSide } from '../enums';

export interface IRollResultHasher {
  convertHashToRollResults(hash: string): EArmadaDiceSide[];
  convertRollResultToHash(rollResult: EArmadaDiceSide[]): string;
}

export class URollResultHasher implements IRollResultHasher {
  convertHashToRollResults(hash: string) {
    return hash.split('').map(rollResultStr => {
      return parseInt(rollResultStr, 10);
    });
  }

  convertRollResultToHash(rollResult: EArmadaDiceSide[]) {
    return rollResult.sort().join('');
  }
}
