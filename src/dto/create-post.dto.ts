import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Users } from '../entities/users.entity';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUserDto {
  id?: number;

  @IsString()
  @ApiProperty()
  body: string;

  @IsString()
  @ApiProperty()
  author: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
