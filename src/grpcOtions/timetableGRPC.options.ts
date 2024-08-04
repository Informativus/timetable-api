import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TIMETABLE_GRPC_PATH } from '../config/constants/constants';

export const timetableGRPCOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'timetable',
    protoPath: join(__dirname, '../../proto/timetable.proto'),
    url: TIMETABLE_GRPC_PATH,
  },
};
