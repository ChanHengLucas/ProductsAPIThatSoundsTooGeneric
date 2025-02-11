import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from my products API! (This is a cry for help please)';
  }

  // getE(): string {
  //   return 'E';
  // }
}
