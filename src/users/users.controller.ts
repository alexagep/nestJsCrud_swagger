import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { ReqResponse } from '../schemas/response';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: CreateUserDto,
    isArray: true,
    description: 'Get All Users',
  })
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth('access-token') //edit here
  @ApiOkResponse({
    type: CreateUserDto,
    isArray: false,
    description: 'Get An User',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  @ApiCreatedResponse({ type: CreateUserDto, description: 'Create An User' })
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<ReqResponse> {
    return await this.usersService.createUser(user);
  }

  @ApiBearerAuth('access-token') //edit here
  @ApiCreatedResponse({ type: CreateUserDto, description: 'Update An User' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Body() user: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReqResponse> {
    return await this.usersService.updateUser(id, user);
  }

  @ApiBearerAuth('access-token') //edit here
  @ApiCreatedResponse({ type: CreateUserDto, description: 'Delete An User' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReqResponse> {
    return await this.usersService.deleteUser(id);
  }
}
