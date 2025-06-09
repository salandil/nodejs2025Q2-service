import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'Album' })
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int' })
  year: number;

  @OneToMany(() => Track, (track) => track.album, {
    onDelete: 'SET NULL',
  })
  tracks: Track[];

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;

  @Column({ default: false })
  isFavorite: boolean;
}
