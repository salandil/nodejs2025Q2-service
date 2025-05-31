import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { albums, artists, favorites, tracks } from 'src/data/database';

@Injectable()
export class FavoritesService {

  findAll() {
    const favoriteArtists = artists.filter(artist => favorites.artists.includes(artist.id));
    const favoriteAlbums = albums.filter(album => favorites.albums.includes(album.id));
    const favoriteTracks = tracks.filter(track => favorites.tracks.includes(track.id));
    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks
    };
  }

  addTrack(id: string) {
    const index = tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new HttpException(`Track id: ${id} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    favorites.tracks.push(id);
    return {
      message: `Track with id: ${id} added`,
    };
  }

  removeTrack(id: string) {
    const index = favorites.tracks.indexOf(id);
    if (index === -1) {
      throw new NotFoundException(`Track id: ${id} is not in favorites`);
    }
    favorites.tracks.splice(index, 1);
    return;
  }

  addAlbum(id: string) {
    const index = albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new HttpException(`Album id: ${id} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    favorites.albums.push(id);
    return {
      message: `Album with id: ${id}addeds`,
    };
  }

  removeAlbum(id: string) {
    const index = favorites.albums.indexOf(id);
    if (index === -1) {
      throw new NotFoundException(`Album id: ${id} is not in favorites`);
    }
    favorites.albums.splice(index, 1);
    return;
  }

  addArtist(id: string) {
    const index = artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new HttpException(`Artist id: ${id} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    favorites.artists.push(id);
    return {
      message: `Artist with id: ${id} added`,
    };
  }

  removeArtist(id: string) {
    const index = favorites.artists.indexOf(id);
    if (index === -1) {
      throw new NotFoundException(`Artist id: ${id} is not in favorites`);
    }
    favorites.artists.splice(index, 1);
    return;
  }
}
