import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Artist' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;

  @Column({ default: false })
  isFavorite: boolean;
}
