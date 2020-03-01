import { EArmadaDiceSide } from '../common/enums';

export type DiceSideEnumToNumericConfig = {
  [key in EArmadaDiceSide]: number;
};

export const diceSideEnumToNumericConfig: DiceSideEnumToNumericConfig = {
  [EArmadaDiceSide.BLANK]: 0,
  [EArmadaDiceSide.SINGLE_HIT]: 1,
  [EArmadaDiceSide.DOUBLE_HIT]: 2,
  [EArmadaDiceSide.ACCURACY]: 3,
  [EArmadaDiceSide.CRITICAL]: 4,
  [EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT]: 5
};

export const diceSideNumericToEnumConfig: EArmadaDiceSide[] = [
  EArmadaDiceSide.BLANK,
  EArmadaDiceSide.SINGLE_HIT,
  EArmadaDiceSide.DOUBLE_HIT,
  EArmadaDiceSide.ACCURACY,
  EArmadaDiceSide.CRITICAL,
  EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT
];
