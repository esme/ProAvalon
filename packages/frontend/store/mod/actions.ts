import { IOpenModModalAction, TOGGLE_MOD_MODAL } from './actions.types';

export const toggleModModal = (): IOpenModModalAction => {
  return {
    type: TOGGLE_MOD_MODAL,
  };
};
