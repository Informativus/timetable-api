import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'replacements',
    protoPath: join(__dirname, '../proto/replacements.proto'),
    url: 'localhost:8081',
  },
};
