import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Matches,
  MinLength,
  IsString,
  IsNumber,
} from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUserDto {
  id?: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  age: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  mobile: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({ required: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
