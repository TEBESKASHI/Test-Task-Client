import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { EventController } from './event.controller';
import { EventService } from './event.service';
import { WebSocketController } from './ws/ws.gateway';
import { ConfigModule } from '@nestjs/config';

const TRANSPORT_NAME = 'EVENTS_SERVICE';
const QUEUE_NAME = 'events_queue';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: TRANSPORT_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBIT_MQ_HOST}:${process.env.RABBIT_MQ_PORT}`,
          ],
          queue: QUEUE_NAME,
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
