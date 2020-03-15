import { EArmadaDiceSide } from '../common/enums';

export type DiceDamageConfig = {
  [key in EArmadaDiceSide]: number;
};

export const diceDamageShipConfig: DiceDamageConfig = {
  [EArmadaDiceSide.BLANK]: 0,
  [EArmadaDiceSide.SINGLE_HIT]: 1,
  [EArmadaDiceSide.DOUBLE_HIT]: 2,
  [EArmadaDiceSide.ACCURACY]: 0,
  [EArmadaDiceSide.CRITICAL]: 1,
  [EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT]: 2,
};

export const diceDamageSquadronConfig: DiceDamageConfig = {
  [EArmadaDiceSide.BLANK]: 0,
  [EArmadaDiceSide.SINGLE_HIT]: 1,
  [EArmadaDiceSide.DOUBLE_HIT]: 2,
  [EArmadaDiceSide.ACCURACY]: 0,
  [EArmadaDiceSide.CRITICAL]: 0,
  [EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT]: 1,
};
