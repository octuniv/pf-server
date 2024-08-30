import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SocialSite } from './entities/socialsite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, SocialSite])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
