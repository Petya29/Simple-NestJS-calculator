import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCalculator(): string {
    return 'index';
  }

  getMain(): string {
    return 'main';
  }
}
