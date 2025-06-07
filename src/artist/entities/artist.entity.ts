import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'Artist' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Track, (track) => track.artist, {
    onDelete: 'SET NULL',
  })
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artist, {
    onDelete: 'SET NULL',
  })
  albums: Album[];

  @Column()
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;

  @Column({ default: false })
  isFavorite: boolean;
}
