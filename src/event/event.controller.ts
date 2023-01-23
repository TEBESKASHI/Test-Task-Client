import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAllEvents() {
    return this.eventService.findAll();
  }

  @Get(':id')
  getEventById(@Param('id') id: number) {
    return this.eventService.findById(id);
  }

  @Post()
  @HttpCode(201)
  async createNewEvent(@Body() createEventDto: CreateEventDto) {
    this.eventService.create(createEventDto);
    return 'Successfuly created';
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteEvent(@Param('id') id: number) {
    await this.eventService.delete(id);
    return 'Successfuly deleted';
  }
}
