import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { EventController } from './event.controller';
import { EventService } from './event.service';
import { WebSocketController } from './ws/ws.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'events_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [EventService, WebSocketController],
  controllers: [EventController],
})
export class EventModule {}
