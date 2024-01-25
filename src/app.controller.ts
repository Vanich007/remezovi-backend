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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const filename = file.filename;
    console.log(filename);
    const response = {
      url: 'http://' + req.headers['host'] + '/' + filename,
    };
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }
}
