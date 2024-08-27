import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

/*
  ToDo : remodeling services (because of amending dto and entity)
*/

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    // return this.usersRepository.update(uuid, { ...updateUserDto });
    return '';
  }
}
