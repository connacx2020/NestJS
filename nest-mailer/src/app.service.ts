import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}
  getHello(): string {
    return 'Hello World!';
  }

  public example(): void {
    this.mailerService.sendMail({
      to:"thethtetaung17@gmail.com",
      from: 'noreply@nestjs.com',
      subject: 'Testing NestMailerModule ',
      text:"Its works"
    }).then(() => {console.log("Sent successful")})
    .catch(err => {console.log(err)})
  }
}
