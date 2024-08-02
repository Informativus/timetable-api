import { Inject, Injectable } from '@nestjs/common';
import { SET_REPLACEMENTS_IN_STORAGE } from 'src/config/constants/constants';
import { ISetGroupInStorage } from 'src/group/Interfaces/ISetGroupInStorage.interface';

@Injectable()
export class ReplacementsUpdateListener {
  constructor(
    @Inject(SET_REPLACEMENTS_IN_STORAGE)
    private readonly replacementsFacade: ISetGroupInStorage,
  ) {}

  async setReplacementsInDatabase(updateReplacementsDto): Promise<void> {}
}
