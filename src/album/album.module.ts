import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [EventEmitterModule.forRoot()],
})
export class AlbumModule {}
