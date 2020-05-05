import { SocketUser } from '../../../../users/users.socket';
import { emitCommandResponse } from '../../commandResponse';
import { Command } from '../../commands.types';
import RedisAdapter from '../../../../redis-adapter/redis-adapter.service';
import { SocketEvents } from '../../../../../proto/lobbyProto';

// all in lower case
const mods = new Set(['pronub', 'morningcatt', 'tyrrox', 'citc', 'pam']);

export const MBan: Command = {
  command: 'mban',

  help: '/mban: Open the ban interface.',

  run: (
    _data: string[],
    senderSocket: SocketUser,
    _redisAdapter: RedisAdapter,
  ) => {
    if (mods.has(senderSocket.user.username)) {
      senderSocket.emit(SocketEvents.OPEN_MOD_MODAL);
      emitCommandResponse(
        'May your judgement bring peace to all!',
        senderSocket,
      );
    } else {
      emitCommandResponse(
        'You are not a mod. Why are you trying this...',
        senderSocket,
      );
    }
  },
};

export default MBan;
