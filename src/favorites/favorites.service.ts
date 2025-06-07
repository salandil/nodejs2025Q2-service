import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async findAll() {
    const favoriteArtists = await this.artistRepository.find({
      where: { isFavorite: true },
    });
    const favoriteAlbums = await this.albumRepository.find({
      where: { isFavorite: true },
    });
    const favoriteTracks = await this.trackRepository.find({
      where: { isFavorite: true },
    });
    return {
      artists:
        favoriteArtists.map(({ isFavorite, ...rest }) =>
          isFavorite ? rest : null,
        ) || [],
      albums:
        favoriteAlbums.map(({ isFavorite, ...rest }) =>
          isFavorite ? rest : null,
        ) || [],
      tracks:
        favoriteTracks.map(({ isFavorite, ...rest }) =>
          isFavorite ? rest : null,
        ) || [],
    };
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new HttpException(
        `Track id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.trackRepository.update(id, { isFavorite: true });
    return {
      message: 'Track added to favorites',
    };
  }

  async removeTrack(id: string, check: boolean = true) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track && check) {
      throw new NotFoundException(`Track id: ${id} is not in favorites`);
    }
    await this.trackRepository.update(id, { isFavorite: false });
    return {
      message: 'Track removed from favorites',
    };
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException(
        `Album id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.albumRepository.update(id, { isFavorite: true });
    return {
      message: 'Album added to favorites',
    };
  }

  async removeAlbum(id: string, check: boolean = true) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album && check) {
      throw new NotFoundException(`Album id: ${id} is not in favorites`);
    }
    await this.albumRepository.update(id, { isFavorite: false });
    return {
      message: 'Album removed from favorites',
    };
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new HttpException(
        `Artist id: ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.artistRepository.update(id, { isFavorite: true });
    return {
      message: 'Artist added to favorites',
    };
  }

  async removeArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist id: ${id} is not in favorites`);
    }
    await this.artistRepository.update(id, { isFavorite: false });
    return {
      message: 'Artist removed from favorites',
    };
  }
}
