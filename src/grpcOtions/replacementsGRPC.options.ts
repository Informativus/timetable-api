import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { REPLACEMENTS_GRPC_PATH } from 'src/config/constants/constants';

export const replacementsGRPCOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'replacements',
    protoPath: join(__dirname, '../../proto/replacements.proto'),
    url: REPLACEMENTS_GRPC_PATH,
  },
};
