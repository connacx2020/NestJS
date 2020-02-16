import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nest-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://test.tha.mm@gmail.com:thetaung@smtp.gmail.com',
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
