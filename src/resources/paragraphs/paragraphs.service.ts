import { Injectable } from '@nestjs/common';
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

  async updatePosts(id: string, updateParagraphDto: UpdateParagraphDto) {
    /*
      TODO : This actions should be made into a transaction
    */
    const paragraphEntity = await this.paragraphsRepository.findOneBy({
      id: id,
    });
    await this.pgPostRepository.delete({ parag_id: id });

    return this.pgPostRepository.insert(
      this.makePostEntitys(updateParagraphDto, paragraphEntity),
    );
  }

  makePostEntitys(
    updateParagraphDto: UpdateParagraphDto,
    paragraphEntity: Paragraph,
  ) {
    return updateParagraphDto.posts.map((post) => {
      const postEntity = new PgPost();
      postEntity.post = post;
      postEntity.paragraph = paragraphEntity;
      return postEntity;
    });
  }

  async remove(id: string) {
    return this.paragraphsRepository.delete(id);
  }

  async findAll() {
    return this.paragraphsRepository.find({
      relations: {
        posts: true,
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
    });
  }
}
