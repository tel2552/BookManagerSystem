import { Controller, Get } from '@nestjs/common';

//Handles GET requests
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Backend already connected to API!';
  }

  @Get('health')
  getHealth(): { status: string } {
    return { status: 'API is healthy' };
  }
}
