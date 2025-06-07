import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.trackRepository.save({ ...createTrackDto });
    return track;
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }
    await this.trackRepository.update(id, {
      ...track,
      ...updateTrackDto,
    });
    const newTrack = await this.trackRepository.findOne({ where: { id } });
    return newTrack;
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }
    this.eventEmitter.emit('track.remove', id);
    await this.trackRepository.delete(id);
    return track;
  }

  @OnEvent('artist.remove')
  async removeArtist(id: string) {
    await this.trackRepository.update(
      {
        artistId: id,
      },
      {
        artistId: null,
      },
    );
  }

  @OnEvent('album.remove')
  async removeAlbum(id: string) {
    await this.trackRepository.update(
      {
        albumId: id,
      },
      {
        albumId: null,
      },
    );
  }
}
