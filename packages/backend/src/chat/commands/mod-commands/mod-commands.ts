import MTest from './commands/mtest';
import { Command } from '../commands.types';
import MHelp from './commands/mhelp';
import MBan from './commands/mban';

const ModCommands: Record<string, Command> = {
  [MHelp.command]: MHelp,
  [MTest.command]: MTest,
  [MBan.command]: MBan,
};

export default ModCommands;
