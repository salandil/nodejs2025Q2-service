import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { randomUUID } from 'node:crypto';
import { albums } from 'src/data/database';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: randomUUID(),
      ...createAlbumDto,
    }
    albums.push(album);
    return album;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    const album = albums.find(album => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = albums.findIndex(album => album.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    const newAlbum = {
      ...albums[index],
      ...updateAlbumDto,
    }
    albums[index] = newAlbum;

    return newAlbum;
  }

  remove(id: string) {
    const index = albums.findIndex(album => album.id === id);
    if (index === -1) { 
     throw new NotFoundException(`Album with id ${id} not found`);
    }
    albums.splice(index, 1);
    return ;
  }
}
