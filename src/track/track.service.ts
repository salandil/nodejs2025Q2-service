import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { favorites, tracks } from 'src/data/database';
import { randomUUID } from 'node:crypto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: randomUUID(),
      ...createTrackDto,
    };
    tracks.push(track);
    return track;
  }

  findAll() {
    return tracks;
  }

  findOne(id: string) {
    const trackIndex = tracks.findIndex((track: Track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }
    return tracks[trackIndex];
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = tracks.findIndex((track: Track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }
    const newTrack = {
      ...tracks[trackIndex],
      ...updateTrackDto,
    };
    return (tracks[trackIndex] = newTrack);
  }

  remove(id: string) {
    const index = tracks.findIndex((track: Track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }
    tracks.splice(index, 1);
    const indexFavorites = favorites.tracks.indexOf(id);
    if (indexFavorites !== -1) {
      favorites.tracks.splice(indexFavorites, 1);
    }
    return;
  }
}
