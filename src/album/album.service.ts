import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { randomUUID } from 'node:crypto';
import { albums } from 'src/data/database';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService {
  constructor(private eventEmitter: EventEmitter2) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: randomUUID(),
      ...createAlbumDto,
    };
    albums.push(album);
    return album;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }
    const newAlbum = {
      ...albums[index],
      ...updateAlbumDto,
    };
    albums[index] = newAlbum;

    return newAlbum;
  }

  @OnEvent('artist.remove')
  removeArtistIds(artistId: string) {
    const albumIds = albums
      .filter((album) => album.artistId === artistId)
      .map((album) => album.id);
    albumIds.forEach((albumId) => {
      const albumIndex = albums.findIndex((album) => album.id === albumId);
      if (albumIndex !== -1) {
        albums[albumIndex].artistId = null;
      }
    });
  }

  remove(id: string) {
    const index = albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }
    albums.splice(index, 1);
    this.eventEmitter.emit('album.remove', id, false);
    return;
  }
}
