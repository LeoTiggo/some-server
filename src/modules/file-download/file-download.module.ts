import { Module } from '@nestjs/common';
import { FileDownloadService } from './file-download.service';
import { FileDownloadController } from './file-download.controller';

@Module({
  controllers: [FileDownloadController],
  providers: [FileDownloadService]
})
export class FileDownloadModule {}
