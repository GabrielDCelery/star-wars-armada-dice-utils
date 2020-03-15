import { EArmadaDiceSide } from '../enums';

export type TArmadaDiceSides = [EArmadaDiceSide, ...Array<EArmadaDiceSide>] & {
  length: 8;
};
