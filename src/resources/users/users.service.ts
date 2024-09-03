import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SocialSite } from './entities/socialsite.entity';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(SocialSite)
    private socialSitesRepository: Repository<SocialSite>,
  ) {}

  async findAll() {
    return this.usersRepository.find({
      relations: {
        socialSites: true,
      },
    });
  }

  async create(createUserDto: createUserDto) {
    const user = this.usersRepository.create({ ...createUserDto });
    return this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOneBy({ id: id });
    if (!findUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    findUser.name = updateUserDto.name;
    findUser.email = updateUserDto.email;
    findUser.phone = updateUserDto.phone;
    findUser.socialSites = updateUserDto.socialSites.map((site) => {
      return this.socialSitesRepository.create({
        url: site,
        user: findUser,
      });
    });
    return this.usersRepository.save(findUser);
  }
}
