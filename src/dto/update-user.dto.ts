import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class UpdateUserDto {
  id?: number;

  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  age?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  mobile?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  email?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
