export const TOGGLE_MOD_MODAL = 'TOGGLE_MOD_MODAL';
export const MOD_BAN = 'MOD_BAN';

export interface IOpenModModalAction {
  type: typeof TOGGLE_MOD_MODAL;
}

export interface IModBanAction {
  type: typeof MOD_BAN;
  username: string;
  reason: string;
  duration: string;
  description: string;
  userban: boolean;
  fullipban: boolean;
  lastipban: boolean;
}

export type ModActionTypes = IOpenModModalAction;
