import { EArmadaDice, EArmadaDiceSide, TArmadaDiceSides } from '../common';

export type DiceSideConfig = {
  [key in EArmadaDice]: TArmadaDiceSides;
};

export const diceSidesConfig: DiceSideConfig = {
  [EArmadaDice.BLACK_DICE]: [
    EArmadaDiceSide.BLANK,
    EArmadaDiceSide.BLANK,
    EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT,
    EArmadaDiceSide.CRITICAL_AND_SINGLE_HIT,
    EArmadaDiceSide.SINGLE_HIT,
    EArmadaDiceSide.SINGLE_HIT,
    EArmadaDiceSide.SINGLE_HIT,
    EArmadaDiceSide.SINGLE_HIT,
  ],
  [EArmadaDice.BLUE_DICE]: [
    EArmadaDiceSide.ACCURACY,
    EArmadaDiceSide.ACCURACY,
    EArmadaDiceSide.CRITICAL,
    EArmadaDiceSide.CRITICAL,
    EArmadaDiceSide.SINGLE_HIT,
    EArmadaDiceSide.SINGLE_HIT,
    EArmadaDiceSide.SINGLE_HIT,
    EArmadaDiceSide.SINGLE_HIT,
  ],
  [EArmadaDice.RED_DICE]: [
    EArmadaDiceSide.ACCURACY,
    EArmadaDiceSide.BLANK,
    EArmadaDiceSide.BLANK,
    EArmadaDiceSide.CRITICAL,
    EArmadaDiceSide.CRITICAL,
    EArmadaDiceSide.DOUBLE_HIT,
    EArmadaDiceSide.SINGLE_HIT,
    EArmadaDiceSide.SINGLE_HIT,
  ],
};
