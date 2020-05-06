import { ModActionTypes, TOGGLE_MOD_MODAL } from './actions.types';

export type ShowModal = boolean;
export interface IModState {
  showModal: ShowModal;
}

const initialState: IModState = {
  showModal: false,
};

const reducer = (
  state: IModState = initialState,
  action: ModActionTypes,
): IModState => {
  switch (action.type) {
    case TOGGLE_MOD_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      };
    default:
      return state;
  }
};

export default reducer;
