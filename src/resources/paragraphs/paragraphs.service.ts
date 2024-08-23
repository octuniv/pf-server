import { Injectable } from '@nestjs/common';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';

@Injectable()
export class ParagraphsService {
  create(createParagraphDto: CreateParagraphDto) {
    return 'This action adds a new paragraph';
  }

  findAll() {
    return `This action returns all paragraphs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paragraph`;
  }

  update(id: number, updateParagraphDto: UpdateParagraphDto) {
    return `This action updates a #${id} paragraph`;
  }

  remove(id: number) {
    return `This action removes a #${id} paragraph`;
  }
}
