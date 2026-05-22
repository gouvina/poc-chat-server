import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(                                          //
    @InjectRepository(User)                             // Explicar todo esto
    private readonly userRepository: Repository<User>,  //
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const row = this.userRepository.create({
      email: createUserDto.email,
      password: createUserDto.password
    })
    const user = await this.userRepository.save(row)

    const userDto: UserDto = {
      id: user.id,
      email: user.email,
      password: user.password,
    }

    return userDto;
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({ order: { createdAt: 'ASC'} });
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const existing = await this.userRepository.findOne({ where: { id } })

    if(!existing) return null

    existing.email = updateUserDto.email
    existing.password = updateUserDto.password
    return this.userRepository.save(existing);
  }

  async deleteUser(id: string): Promise<User | null> {
    const existing = await this.userRepository.findOne({ where: { id } })

    if (!existing) return null

    await this.userRepository.remove(existing)
    return existing;
  }
}
