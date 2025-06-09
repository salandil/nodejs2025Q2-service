import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    try {
      const newArtist = await this.artistRepository.save(createArtistDto);
      return newArtist;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    await this.artistRepository.update(id, {
      ...artist,
      ...updateArtistDto,
    });
    const newArtist = await this.artistRepository.findOne({ where: { id } });
    return newArtist;
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    await this.artistRepository.delete(id);
    return;
  }
}
