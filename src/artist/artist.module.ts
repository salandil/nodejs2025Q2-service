import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [EventEmitterModule.forRoot()],
})
export class ArtistModule {}
