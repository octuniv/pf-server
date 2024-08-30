import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ParagraphsService } from './paragraphs.service';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';

@Controller('paragraphs')
export class ParagraphsController {
  constructor(private readonly paragraphsService: ParagraphsService) {}

  @Post()
  async create(@Body() createParagraphDto: CreateParagraphDto) {
    return this.paragraphsService.create(createParagraphDto);
  }

  @Patch('/update/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateParagraphDto: UpdateParagraphDto,
  ) {
    return this.paragraphsService.update(id, updateParagraphDto);
  }

  @Delete('/delete/:id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.paragraphsService.remove(id);
  }

  @Get()
  async findAll() {
    return this.paragraphsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.paragraphsService.findOne(id);
  }
}
