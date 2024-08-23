import { Injectable } from '@nestjs/common';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';
import { Repository } from 'typeorm';
import { Paragraph } from './entities/paragraph.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParagraphsService {
  constructor(
    @InjectRepository(Paragraph)
    private paragraphsRepository: Repository<Paragraph>,
  ) {}

  create(createParagraphDto: CreateParagraphDto) {
    const paragraph = new Paragraph();
    paragraph.title = createParagraphDto.title;
    paragraph.content = createParagraphDto.content;
    return this.paragraphsRepository.save(paragraph);
  }

  findAll() {
    return this.paragraphsRepository.find();
  }

  findOne(id: string) {
    return this.paragraphsRepository.findOneBy({ id: id });
  }

  update(id: string, updateParagraphDto: UpdateParagraphDto) {
    return this.paragraphsRepository.update(id, { ...updateParagraphDto });
  }

  remove(id: string) {
    return this.paragraphsRepository.delete(id);
  }
}
