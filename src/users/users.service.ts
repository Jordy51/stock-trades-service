import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async getUserById(id: number): Promise<User | null> {
    return this.usersRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getUserByEmail(email);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createAndSave({ ...createUserDto });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    return this.usersRepository.updateRefreshToken(id, refreshToken);
  }
}
