import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Partial<UserRepository>;

  beforeEach(async () => {
    userRepository = {
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      createAndSave: jest.fn(),
      updateRefreshToken: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      const user = { id: 1, email: 'test@example.com' } as User;
      jest.spyOn(userRepository, 'getUserById').mockResolvedValue(user);

      await expect(service.getUserById(1)).resolves.toEqual(user);
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user if found by email', async () => {
      const user = { id: 1, email: 'test@example.com' } as User;
      jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValue(user);

      await expect(service.getUserByEmail('test@example.com')).resolves.toEqual(
        user,
      );
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
      };
      const savedUser = { ...createUserDto, id: 1 } as User;
      jest.spyOn(userRepository, 'createAndSave').mockResolvedValue(savedUser);

      await expect(service.create(createUserDto)).resolves.toEqual(savedUser);
    });
  });

  describe('updateRefreshToken', () => {
    it('should update refresh token', async () => {
      jest.spyOn(userRepository, 'updateRefreshToken').mockResolvedValue();

      await expect(
        service.updateRefreshToken(1, 'newRefreshToken'),
      ).resolves.toBeUndefined();
    });
  });
});
