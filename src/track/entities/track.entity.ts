import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Track' })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @Column({ type: 'int' })
  duration: number;

  @Column({ default: false })
  isFavorite: boolean;
}
