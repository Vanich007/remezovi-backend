import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { imageFileFilter } from './utils/imageFileFilter';
import { diskStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { PostEntity } from './post/post.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/users.module';
import { PostsModule } from './post/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './upload');
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
      fileFilter: imageFileFilter,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.BD_IP,
      port: 3306,
      username: process.env.BD_USER,
      password: process.env.BD_PWD,
      database: process.env.BD_NAME,
      entities: [User, PostEntity],
      synchronize: true,
    }),
    // UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
