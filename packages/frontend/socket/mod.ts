import { SocketEvents } from '../proto/lobbyProto';
import { store } from '../store';
import { toggleModModal } from '../store/mod/actions';

export const SetSocketModEvents = (socket: SocketIOClient.Socket): void => {
  socket.on(SocketEvents.OPEN_MOD_MODAL, () => {
    store.dispatch(toggleModModal());
  });
};
