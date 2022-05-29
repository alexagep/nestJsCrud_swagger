import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

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
    }).compile();

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
    const id = 1;
    const user = new UpdateUserDto();
    // user.id = id;
    await controller.updateUser(user, id);
    expect(service.updateUser).toHaveBeenCalledWith(id, user);
  });

  it('create user', async () => {
    const user = new User();
    await controller.createUser(user);
    expect(service.createUser).toHaveBeenCalledWith(user);
  });

  it('delete user', async () => {
    const id = 1;
    await controller.deleteUser(id);
    expect(service.deleteUser).toHaveBeenCalledWith(id);
  });
});
