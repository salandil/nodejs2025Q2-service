import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([Album, Artist, Track])],
})
export class AlbumModule {}
