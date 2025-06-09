import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    try {
      const newAlbum = await this.albumRepository.save(createAlbumDto);
      return newAlbum;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }
    await this.albumRepository.update(id, updateAlbumDto);
    const newAlbum = await this.albumRepository.findOne({ where: { id } });
    return newAlbum;
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }
    await this.albumRepository.delete(id);
    return;
  }
}
