import { Inject, Injectable } from '@nestjs/common';
import {
  GET_GROUP_WITH_DATA,
  SET_REPLACEMENTS_IN_STORAGE,
} from 'src/config/constants/constants';
import { CreateReplacementDto } from 'src/dto/replacement/createReplacement.dto';
import { GetReplacementDto } from 'src/dto/replacement/getReplacement.dto';
import { IGetGroupWithData } from 'src/group/Interfaces/IGetGroupWithData.interface';
import { GroupId } from 'src/group/types/groupId.type';
import { ValidateAndMapDto } from 'src/validators/validateAndMapHttpDecorator.validator';
import { IReplacementRepository } from '../repositories/replacementsRepository.interface';
import { IInserterReplacementInCache } from './IInserterRepalcementInCache.interface';

@Injectable()
export class SetReplacements implements IInserterReplacementInCache {
  constructor(
    @Inject(SET_REPLACEMENTS_IN_STORAGE)
    private readonly replacementRepository: IReplacementRepository,
    @Inject(GET_GROUP_WITH_DATA)
    private readonly groupService: IGetGroupWithData,
  ) {}

  @ValidateAndMapDto(GetReplacementDto, CreateReplacementDto)
  async setReplacementsWithDate(
    replacementsDto: GetReplacementDto,
    replacements: CreateReplacementDto,
  ): Promise<void> {
    const groupId: GroupId = await this.getGroupId(replacementsDto);

    await this.replacementRepository.setReplacementWithDate(
      groupId,
      replacements,
      replacementsDto.date,
    );
  }

  async setReplacementInCache(
    replacement: CreateReplacementDto,
    key: string,
  ): Promise<void> {
    try {
      await this.replacementRepository.setReplacementInCache(key, replacement);
    } catch (error) {
      console.log(error);
    }
  }

  async getGroupId(replacementsDto: GetReplacementDto): Promise<GroupId> {
    try {
      return <GroupId>await this.groupService.getGroupWithId({
        id: replacementsDto.group,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
