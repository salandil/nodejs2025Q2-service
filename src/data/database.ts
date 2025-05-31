import { Artist } from 'src/artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Favorites } from 'src/favorites/entities/favorites.entity';

export const users: User[] = [];

export const artists: Artist[] = [];

export const tracks: Track[] = [];

export const albums: Album[] = [];

export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
