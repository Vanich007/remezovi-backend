import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('post-image')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    console.log('req.headers', req.headers);
    const filename = file.filename;

    const response = {
      url:
        'http://' +
        req.headers['host'].slice(4) +
        '/back-remezovi/upload/' +
        filename,
    };
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: '../../upload' });
  }
}
