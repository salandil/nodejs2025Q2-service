import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.albumRepository.save(createAlbumDto);
    return newAlbum;
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
    const newAlbum = await this.albumRepository.update(id, updateAlbumDto);
    return newAlbum;
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }
    this.eventEmitter.emit('album.remove', id);
    await this.albumRepository.delete(id);
    return;
  }

  @OnEvent('artist.remove')
  async removeArtist(id: string) {
    await this.albumRepository.update(
      {
        artistId: id,
      },
      {
        artistId: null,
      },
    );
    return;
  }
}
