import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'Track' })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Album;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;

  @Column({ type: 'uuid', nullable: true })
  albumId: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ default: false })
  isFavorite: boolean;
}
