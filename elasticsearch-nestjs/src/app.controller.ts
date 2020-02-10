import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@Post('create')
async createIndexAndInsert(@Body() documents: any) {
    const res = await this.appService.bulkInsert(documents);
    console.log(res.data);
    return res;
}

@Get('search')
async searchPokemonAbilities(@Query('q') q: string) {
    const results = await this.appService.searchIndex(q);
    return results;
}
}
