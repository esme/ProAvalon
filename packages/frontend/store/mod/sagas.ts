import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import Swal from 'sweetalert2';

import { MOD_BAN, IModBanAction } from './actions.types';
import { toggleModModal } from './actions';
import { Post } from '../../axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SwalCall = (opts: any): Promise<void> => {
  return new Promise((resolve) => {
    Swal.fire({
      heightAuto: false,
      ...opts,
      onClose: () => {
        resolve();
      },
    });
  });
};

function* modBan(action: IModBanAction): SagaIterator {
  try {
    yield call(Post, '/mod/ban', action);

    // Close modal after a successful mod ban.
    yield put(toggleModModal());
  } catch (e) {
    yield call(SwalCall, {
      title: 'Oops',
      text: e.response.data.message ? e.response.data.message : e.response.data,
      icon: 'error',
    });
  }
}

function* watchModBan(): SagaIterator {
  yield takeLatest(MOD_BAN, modBan);
}

export function* modSaga(): SagaIterator {
  yield fork(watchModBan);
}
