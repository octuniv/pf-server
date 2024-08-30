import { PartialType } from '@nestjs/mapped-types';
import { HistoryDto } from './history.dto';

export class PartialHistoryDto extends PartialType(HistoryDto) {}
