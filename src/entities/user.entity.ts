import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: null })
  @ApiProperty()
  name: string;

  @Column({ unique: true, default: null })
  @ApiProperty()
  mobile: string;

  @Column({ unique: true, default: null })
  @ApiProperty()
  email: string;

  @Column({ default: null })
  @ApiProperty()
  password: string;

  @Column({ default: null })
  @ApiProperty()
  age: number;

  @Column({ default: null })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: null })
  @UpdateDateColumn()
  updatedAt: Date;
}
