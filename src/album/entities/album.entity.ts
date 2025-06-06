import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Album' })
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @Column({ default: false })
  isFavorite: boolean;
}
