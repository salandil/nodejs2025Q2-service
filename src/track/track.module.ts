import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [EventEmitterModule.forRoot()],
})
export class TrackModule {}
