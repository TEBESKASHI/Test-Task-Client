import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { subscriber, RedisChannels } from '../../redis';
import { Server } from 'socket.io';

@WebSocketGateway({
  transports: ['websocket'],
})
export class WebSocketController {
  constructor() {
    this.liveFromRedis();
  }
  @WebSocketServer()
  io: Server;

  async liveFromRedis() {
    subscriber.on('message', (channel, message) => {
      switch (channel) {
        case RedisChannels.EVENT_CREATED: {
          return this.io.emit(
            `${RedisChannels.EVENT_CREATED}:${message}`,
            `new event with type ${message} created`,
          );
        }
        case RedisChannels.EVENT_DELETED: {
          return this.io.emit(
            `${RedisChannels.EVENT_DELETED}:${message}`,
            `event with type ${message} deleted`,
          );
        }
        default: {
          break;
        }
      }
    });
  }
}
