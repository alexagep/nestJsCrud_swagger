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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { ReqResponse } from '../dto/response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor';
import { Roles } from '../roles.decorator';
import { RolesGuard } from '../roles.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(BenchmarkInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: CreateUserDto,
    isArray: true,
    description: 'Get All Users',
  })
  @Get()
  @Roles('admin')
  async getUsers(): Promise<Users[]> {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth('access-token') //edit here
  @ApiOkResponse({
    type: CreateUserDto,
    isArray: false,
    description: 'Get An User',
  })
  @Get(':id')
  @Roles('admin', 'user')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return await this.usersService.findOneById(id);
  }

  @ApiCreatedResponse({ type: CreateUserDto, description: 'Create An User' })
  @Post()
  async createUser(@Body() user: Users): Promise<ReqResponse> {
    return await this.usersService.createUser(user);
  }

  @ApiBearerAuth('access-token') //edit here
  @ApiCreatedResponse({ type: CreateUserDto, description: 'Update An User' })
  @ApiNotFoundResponse()
  @Put(':id')
  async updateUser(
    @Body() user: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReqResponse> {
    return await this.usersService.updateUser(id, user);
  }

  @ApiBearerAuth('access-token') //edit here
  @ApiCreatedResponse({ type: CreateUserDto, description: 'Delete An User' })
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReqResponse> {
    return await this.usersService.deleteUser(id);
  }
}
