import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = new User();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.phone = updateUserDto.phone;
    user.socialSites = updateUserDto.socialSites;

    await this.usersRepository.update(uuid, user);
  }
}
