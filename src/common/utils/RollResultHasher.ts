import { EArmadaDiceSide } from '../enums';
import {
  diceSideEnumToNumericConfig,
  diceSideNumericToEnumConfig
} from '../../configs';

export interface IRollResultHasher {
  convertHashToRollResult(hash: string): EArmadaDiceSide[];
  convertRollResultToHash(rollResult: EArmadaDiceSide[]): string;
}

export class URollResultHasher implements IRollResultHasher {
  convertHashToRollResult(rollResultHash: string) {
    return rollResultHash.split('').map(diceSide => {
      return diceSideNumericToEnumConfig[parseInt(diceSide, 10)];
    });
  }

  convertRollResultToHash(rollResult: EArmadaDiceSide[]) {
    return rollResult
      .map(diceSide => {
        return diceSideEnumToNumericConfig[diceSide];
      })
      .sort()
      .join('');
  }
}
