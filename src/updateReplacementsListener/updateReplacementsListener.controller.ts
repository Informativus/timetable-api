import { Controller } from '@nestjs/common';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { UpdateReplacementsListener } from './updateReplacementsListener.service';
import { GrpcMethod } from '@nestjs/microservices';
import { PostReplacementsUpdate } from '../proto/replacements';

@Controller()
export class UpdateReplacementsListenerController {
  constructor(
    private readonly updateReplaceListener: UpdateReplacementsListener,
  ) {}

  @GrpcMethod('UpdateReplacementsListener', 'UpdateReplacements')
  async updateReplacementsListener(
    request: PostReplacementsUpdate,
  ): Promise<Empty> {
    return this.updateReplaceListener.updateReplacementsListener(request);
  }
}
