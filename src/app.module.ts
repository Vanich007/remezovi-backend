import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { imageFileFilter } from './utils/imageFileFilter';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './upload');
        },
        filename: function (req, file, cb) {
          cb(null, Date.now()+ '-' +file.originalname  );
        },
      }),
      fileFilter: imageFileFilter,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
