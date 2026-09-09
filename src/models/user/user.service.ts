import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { hashPassword } from 'src/utils/hash.util';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email }})

    if (existingUser) { throw new ConflictException('Email is already in use') }

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await hashPassword(Buffer.from(createUserDto.password, 'base64').toString('utf-8')),
    });

    return plainToInstance(UserDto, user);
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find({ order: { createdAt: 'ASC' } });

    return plainToInstance(UserDto, users)
  }

  async getUser(id: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException();

    return plainToInstance(UserDto, user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const formattedEmail = email.trim().toLowerCase();

    return this.userRepository.findOne({
      where: [{ email: formattedEmail }],
    });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    const existing = await this.userRepository.findOne({ where: { id } });

    if (!existing) throw new NotFoundException();

    const emailInUse = await this.userRepository.findOne({ where: { email: updateUserDto.email }})

    if (emailInUse && emailInUse.id !== existing.id) { throw new ConflictException('Email is already in use')}

    existing.email = updateUserDto.email ?? existing.email;

    if (updateUserDto.password) {
      existing.password = await hashPassword(Buffer.from(updateUserDto.password, 'base64').toString('utf-8'));
    }
    
    const user = await this.userRepository.save(existing);

    return plainToInstance(UserDto, user)
  }

  async deleteUser(id: string): Promise<UserDto | null> {
    const existing = await this.userRepository.findOne({ where: { id } });

    if (!existing) throw new NotFoundException();

    const user = await this.userRepository.remove(existing)
    
    return plainToInstance(UserDto, user)
  }
}
