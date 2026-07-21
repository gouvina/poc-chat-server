import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { hashPassword } from './password.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async assertUniqueEmailAndUsername(
    email: string,
    username: string,
    excludeUserId?: string,
  ): Promise<void> {
    const [existingEmail, existingUsername] = await Promise.all([
      this.userRepository.findOne({ where: { email } }),
      this.userRepository.findOne({ where: { username } }),
    ]);

    if (existingEmail && existingEmail.id !== excludeUserId) {
      throw new ConflictException('Email is already in use');
    }

    if (existingUsername && existingUsername.id !== excludeUserId) {
      throw new ConflictException('Username is already in use');
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    await this.assertUniqueEmailAndUsername(
      createUserDto.email,
      createUserDto.username,
    );

    const row = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: await hashPassword(createUserDto.password),
    });
    const user = await this.userRepository.save(row);

    const userDto = plainToInstance(UserDto, user);

    return userDto;
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find({ order: { createdAt: 'ASC' } });

    const usersDto = users.map((user) => plainToInstance(UserDto, user));

    return usersDto;
  }

  async getUser(id: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException();

    const userDto = plainToInstance(UserDto, user);

    return userDto;
  }

  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    const trimmed = identifier.trim();
    const normalizedEmail = trimmed.toLowerCase();

    return this.userRepository.findOne({
      where: [{ email: normalizedEmail }, { username: trimmed }],
    });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    const existing = await this.userRepository.findOne({ where: { id } });

    if (!existing) throw new NotFoundException();

    const nextEmail = updateUserDto.email ?? existing.email;
    const nextUsername = updateUserDto.username ?? existing.username;

    await this.assertUniqueEmailAndUsername(nextEmail, nextUsername, id);

    existing.email = nextEmail;
    existing.username = nextUsername;
    if (updateUserDto.password) {
      existing.password = await hashPassword(updateUserDto.password);
    }
    const user = await this.userRepository.save(existing);

    const userDto = plainToInstance(UserDto, user);

    return userDto;
  }

  async deleteUser(id: string): Promise<UserDto | null> {
    const existing = await this.userRepository.findOne({ where: { id } });

    if (!existing) throw new NotFoundException();

    const user = await this.userRepository.remove(existing);

    const userDto = plainToInstance(UserDto, user);

    return userDto;
  }
}
