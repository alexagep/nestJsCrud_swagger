import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { User } from '../entities/user.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRoles } from 'src/model/userRoles';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mochUserService = {
    findAll: jest.fn(() => []),
    findOneById: jest.fn(() => {}),
    updateUser: jest.fn(() => {
      return {
        status: 200,
        success: true,
        message: 'User updated successfully',
        error: false,
      };
    }),
    deleteUser: jest.fn(() => {
      return {
        status: 200,
        success: true,
        message: 'User deleted successfully',
        error: false,
      };
    }),
    createUser: jest.fn(() => {
      return {
        status: 201,
        success: true,
        message: 'User created successfully',
        error: false,
      };
    }),
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        findAll: jest.fn(() => []),
        findOneById: jest.fn(() => {}),
        updateUser: jest.fn(() => {}),
        deleteUser: jest.fn(() => {}),
        createUser: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ApiServiceProvider],
      // imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
    })
      .overrideProvider(UsersService)
      .useValue(mochUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return an array of users', () => {
    controller.getUsers();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a user by id', async () => {
    let id: 1;
    await controller.getUserById(id);
    expect(service.findOneById).toHaveBeenCalledWith(id);
  });

  it('update user by id', async () => {
    const data: UpdateUserDto = {
      name: 'example',
      age: 18,
      posts: [],
      role: UserRoles.admin,
      mobile: '09121054870',
    };

    const id = 1;
    // const user = new UpdateUserDto();
    const updateResp = await controller.updateUser(data, id);

    expect(updateResp).toEqual({
      status: 200,
      success: true,
      message: 'User updated successfully',
      error: false,
    });
    expect(service.updateUser).toHaveBeenCalledWith(id, data);
  });

  const dto: CreateUserDto = {
    name: 'example',
    age: 18,
    mobile: '09121054870',
    email: 'person@example.com',
    password: 'Airbnb10',
    posts: [],
    role: UserRoles.admin,
    createdAt: undefined,
    updatedAt: undefined,
  };

  it('create user', async () => {
    // const user = new CreateUserDto();
    expect(await controller.createUser(dto)).toEqual(
      expect.objectContaining({
        status: expect.any(Number),
        success: true,
        message: expect.any(String),
        error: expect.any(Boolean),
      }),
    );

    expect(mochUserService.createUser).toHaveBeenCalledWith(dto);
  });

  it('delete user', async () => {
    const id = 1;
    const resp = await controller.deleteUser(id);

    expect(resp).toEqual(
      expect.objectContaining({
        status: expect.any(Number),
        success: true,
        message: expect.any(String),
        error: expect.any(Boolean),
      }),
    );

    expect(mochUserService.deleteUser).toHaveBeenCalledWith(id);
  });
});
