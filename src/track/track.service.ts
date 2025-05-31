import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { tracks } from 'src/data/database';
import { randomUUID } from 'node:crypto';
import { Track } from './entities/track.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TrackService {
  constructor(private eventEmitter: EventEmitter2) {}

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
    this.eventEmitter.emit('track.remove', id, false);
    return;
  }

  @OnEvent('artist.remove')
  removeArtistIds(artistId: string) {
    const trackIds = tracks
      .filter((track) => track.artistId === artistId)
      .map((track) => track.id);
    trackIds.forEach((trackId) => {
      const trackIndex = tracks.findIndex((track) => track.id === trackId);
      if (trackIndex !== -1) {
        tracks[trackIndex].artistId = null;
      }
    });
  }

  @OnEvent('album.remove')
  removeAlbumIds(albumId: string) {
    const trackIds = tracks
      .filter((track) => track.albumId === albumId)
      .map((track) => track.id);
    trackIds.forEach((trackId) => {
      const trackIndex = tracks.findIndex((track) => track.id === trackId);
      if (trackIndex !== -1) {
        tracks[trackIndex].albumId = null;
      }
    });
  }
}
