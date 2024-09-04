import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';
import { Repository } from 'typeorm';
import { Paragraph } from './entities/paragraph.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PgPost } from './entities/pgPost.entity';

@Injectable()
export class ParagraphsService {
  constructor(
    @InjectRepository(Paragraph)
    private paragraphsRepository: Repository<Paragraph>,
    @InjectRepository(PgPost)
    private pgPostRepository: Repository<PgPost>,
  ) {}

  async create(createParagraphDto: CreateParagraphDto) {
    const paragraph = new Paragraph();
    paragraph.title = createParagraphDto.title;
    return this.paragraphsRepository.save(paragraph);
  }

  async update(id: string, updateParagraphDto: UpdateParagraphDto) {
    const findParagraph = await this.paragraphsRepository.findOneBy({
      id: id,
    });
    if (!findParagraph) {
      throw new NotFoundException(`Paragraph with id ${id} not found`);
    }
    findParagraph.title = updateParagraphDto.title;
    findParagraph.posts = updateParagraphDto.posts.map((post) => {
      return this.pgPostRepository.create({
        post: post,
        paragraph: findParagraph,
      });
    });
    return this.paragraphsRepository.save(findParagraph);
  }

  async remove(id: string) {
    return this.paragraphsRepository.delete(id);
  }

  async findAll() {
    return this.paragraphsRepository.find({
      relations: {
        posts: true,
      },
      order: {
        createAt: 'ASC',
        posts: {
          id: 'ASC',
        },
      },
    });
  }

  async findOne(id: string) {
    return this.paragraphsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        posts: true,
      },
      order: {
        posts: {
          id: 'ASC',
        },
      },
    });
  }
}
