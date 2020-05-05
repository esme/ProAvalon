import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import RedisClientService from '../../redis-client/redis-client.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private redisClientService: RedisClientService,
  ) {
    super();
  }

  async validate(displayUsername: string, password: string) {
    const bannedTime = await this.redisClientService.redisClient.get(
      `banneduser:${displayUsername.toLowerCase()}`,
    );
    if (bannedTime) {
      throw Error(`You are banned until ${bannedTime}.`);
    }

    const user = await this.authService.validateUser(displayUsername, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (displayUsername !== user.displayUsername) {
      const updatedUser = await this.usersService.updateDisplayUsername(
        displayUsername,
      );
      if (updatedUser) {
        return updatedUser;
      }
    }
    return user;
  }
}
