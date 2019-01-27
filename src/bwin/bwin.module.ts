import { Module, HttpModule } from '@nestjs/common';
import { BwinService } from './bwin.service';
import { BwinController } from './bwin.controller';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
    providers: [BwinService],
    controllers: [BwinController],
})
export class BwinModule {}
