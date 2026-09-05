import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(                                          
    @InjectRepository(User)                             
    private readonly userRepository: Repository<User>, 
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: createUserDto.password
    })

    return plainToInstance(UserDto, user)
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find({ order: { createdAt: 'ASC'} });

    return plainToInstance(UserDto, users)
  }

  async getUser(id: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException()

    return plainToInstance(UserDto, user)
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDto | null> {
    const existing = await this.userRepository.findOne({ where: { id } })

    if (!existing) throw new NotFoundException()

    existing.email = updateUserDto.email ?? existing.email
    existing.password = updateUserDto.password ?? existing.password
    const user = await this.userRepository.save(existing);

    return plainToInstance(UserDto, user)
  }

  async deleteUser(id: string): Promise<UserDto | null> {
    const existing = await this.userRepository.findOne({ where: { id } })

    if (!existing) throw new NotFoundException()

    const user = await this.userRepository.remove(existing)
    
    return plainToInstance(UserDto, user)
  }
}
