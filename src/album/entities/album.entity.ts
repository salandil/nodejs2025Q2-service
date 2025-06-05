import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null;

  @Column({ default: false })
  isFavorite: boolean;
}
