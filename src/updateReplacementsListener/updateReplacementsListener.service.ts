import { Injectable } from '@nestjs/common';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { UpdateReplacementsDto } from 'src/dto/replacement/updateReplacementsListener/updateReplacements.dto';
import { ValidateAndMapDtoGrpc } from 'src/validators/validateAndMapRPCDecorator.validator';
import { UpdateReplacementsInStorage } from './ReplacementsUpdater/updateReplacements.service';

@Injectable()
export class UpdateReplacementsListener {
  constructor(
    private readonly updateReplaceInStorage: UpdateReplacementsInStorage,
  ) {}

  @ValidateAndMapDtoGrpc(UpdateReplacementsDto)
  async updateReplacementsListener(
    request: UpdateReplacementsDto,
  ): Promise<Empty> {
    return await this.updateReplaceInStorage.updateReplacements(request);
  }
}
