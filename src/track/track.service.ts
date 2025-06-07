import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    try {
      const track = await this.trackRepository.save({ ...createTrackDto });
      return track;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
    await this.trackRepository.delete(id);
    return track;
  }
}
