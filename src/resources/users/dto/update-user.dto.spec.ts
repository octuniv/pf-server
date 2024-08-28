import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
import { MakeUpdateUserDtoFaker } from '../fakers/user.fakers';

describe('Update-User.Dto', () => {
  it('should be valid with valid properties', () => {
    const updateUserDto = plainToClass(UpdateUserDto, MakeUpdateUserDtoFaker());
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(0);
  });

  it('should be invalid with invalid email', () => {
    const wrongUserDto = MakeUpdateUserDtoFaker();
    wrongUserDto.email = 'ttttt';
    const updateUserDto = plainToClass(UpdateUserDto, wrongUserDto);
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
  });

  it('should be invalid with invalid phone number', () => {
    const wrongUserDto = MakeUpdateUserDtoFaker();
    wrongUserDto.phone = '0s-33z-2223';
    const updateUserDto = plainToClass(UpdateUserDto, wrongUserDto);
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
  });

  it('should be invalid with invalid socialSites', () => {
    const wrongUserDto = MakeUpdateUserDtoFaker();
    wrongUserDto.socialSites = ['a.b.com', 'b.c.ddd.e'];
    const updateUserDto = plainToClass(UpdateUserDto, wrongUserDto);
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
  });
});
