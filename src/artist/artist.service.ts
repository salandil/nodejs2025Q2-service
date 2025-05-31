import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { randomUUID } from 'crypto';
import { albums, artists, favorites, tracks } from 'src/data/database';

@Injectable()
export class ArtistService {

  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: randomUUID(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    }
    artists.push(artist);
    return artist;
  }

  findAll() {
    return artists;
  }

  findOne(id: string) {
    const artist = artists.find(artist => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = artists.findIndex(artist => artist.id === id);
    if (index === -1) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    const newArtist = {
      ...artists[index],
      ...updateArtistDto,
    }
    artists[index] = newArtist;
    return newArtist;
  }

  remove(id: string) {
    const index = artists.findIndex(artist => artist.id === id);
    if (index === -1) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    artists.splice(index, 1);
    const indexFavorites = favorites.artists.indexOf(id);
    if (indexFavorites !== -1) {
      favorites.artists.splice(indexFavorites, 1);
    }
    const trackIds = tracks
      .filter(track => track.artistId === id)
      .map(track => track.id);
      trackIds.forEach(trackId => {
      const trackIndex = tracks.findIndex(track => track.id === trackId);
      if (trackIndex !== -1) {
        tracks[trackIndex].artistId = null;
      }
    });
    const albumIds = albums
      .filter(album => album.artistId === id)
      .map(album => album.id);
    albumIds.forEach(albumId => {
      const albumIndex = albums.findIndex(album => album.id === albumId);
      if (albumIndex !== -1) {
        albums[albumIndex].artistId = null;
      }
    });
    return ;
  }
}
