import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [EventEmitterModule.forRoot(), TypeOrmModule.forFeature([Track])],
})
export class TrackModule {}
