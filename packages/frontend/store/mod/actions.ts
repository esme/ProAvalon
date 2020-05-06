import {
  IOpenModModalAction,
  TOGGLE_MOD_MODAL,
  IModBanAction,
  MOD_BAN,
} from './actions.types';

export const toggleModModal = (): IOpenModModalAction => {
  return {
    type: TOGGLE_MOD_MODAL,
  };
};

export const modBan = (inputs: Omit<IModBanAction, 'type'>): IModBanAction => {
  return {
    type: MOD_BAN,
    ...inputs,
  };
};
