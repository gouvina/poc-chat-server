import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, NotFoundException, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto | null> {
    return this.userService.getUser(id); 
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    return this.userService.updateUser(id, updateUserDto) 
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto | null> {
    return this.userService.deleteUser(id); 
  }
}
