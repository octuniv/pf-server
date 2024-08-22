import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
import { MakeUserFakerDto } from '../user.make.faker';

describe('Update-User.Dto', () => {
  it('should be valid with valid properties', () => {
    const updateUserDto = plainToClass(UpdateUserDto, MakeUserFakerDto());
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(0);
  });

  it('should be invalid with invalid email', () => {
    const wrongUserDto = MakeUserFakerDto();
    wrongUserDto.email = 'ttttt';
    const updateUserDto = plainToClass(UpdateUserDto, wrongUserDto);
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
  });

  it('should be invalid with invalid phone number', () => {
    const wrongUserDto = MakeUserFakerDto();
    wrongUserDto.phone = '0s-33z-2223';
    const updateUserDto = plainToClass(UpdateUserDto, wrongUserDto);
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
  });

  it('should be invalid with invalid socialSites', () => {
    const wrongUserDto = MakeUserFakerDto();
    wrongUserDto.socialSites = ['a.b.com', 'b.c.ddd'].join('##$$****&^^');
    const updateUserDto = plainToClass(UpdateUserDto, wrongUserDto);
    const errors = validateSync(updateUserDto);
    expect(errors).toHaveLength(1);
  });
});
