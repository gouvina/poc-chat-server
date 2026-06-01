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
    const row = this.userRepository.create({
      email: createUserDto.email,
      password: createUserDto.password
    })
    const user = await this.userRepository.save(row)

    const userDto = plainToInstance(UserDto, user)

    return userDto;
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find({ order: { createdAt: 'ASC'} });

    const usersDto = users.map(user => plainToInstance(UserDto, user))
  
    return usersDto;
  }

  async getUser(id: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException()

    const userDto = plainToInstance(UserDto, user)

    return userDto;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDto | null> {
    const existing = await this.userRepository.findOne({ where: { id } })

    if (!existing) throw new NotFoundException()

    existing.email = updateUserDto.email ?? existing.email
    existing.password = updateUserDto.password ?? existing.password
    const user = await this.userRepository.save(existing);

    const userDto = plainToInstance(UserDto, user)

    return userDto;
  }

  async deleteUser(id: string): Promise<UserDto | null> {
    const existing = await this.userRepository.findOne({ where: { id } })

    if (!existing) throw new NotFoundException()

    const user = await this.userRepository.remove(existing)
    
    const userDto = plainToInstance(UserDto, user)

    return userDto;
  }
}
