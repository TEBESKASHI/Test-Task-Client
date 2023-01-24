import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEntity } from './event.entity';
import { EventTransportChannel } from './enum';

const SERVICE_NAME = 'EVENTS_SERVICE';

@Injectable()
export class EventService {
  constructor(@Inject(SERVICE_NAME) private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  findAll(): Observable<EventEntity[]> {
    return this.client.send(EventTransportChannel.EVENT_ALL, '');
  }

  findById(id: number): Observable<EventEntity> {
    return this.client.send(EventTransportChannel.EVENT_BY_ID, id);
  }

  create(event: CreateEventDto): Observable<void> {
    return this.client.emit(EventTransportChannel.EVENT_CREATE, event);
  }

  delete(id: number): Observable<void> {
    return this.client.emit(EventTransportChannel.EVENT_DELETE, id);
  }
}
