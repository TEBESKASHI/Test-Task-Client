import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEntity } from './event.entity';

@Injectable()
export class EventService {
  constructor(@Inject('EVENTS_SERVICE') private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  findAll(): Observable<EventEntity[]> {
    return this.client.send('event-all', { test: true });
  }

  findById(id: number) {
    return this.client.send('event-by-id', id);
  }

  create(event: CreateEventDto) {
    return this.client.emit('event-create', event);
  }

  delete(id: number) {
    return this.client.emit('event-delete', id);
  }
}
