import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createAndSave(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return this.save(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.findOne({ where: { id } });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const order = await this.getUserById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    order.refreshToken = refreshToken;
    await this.save(order);
  }
}
