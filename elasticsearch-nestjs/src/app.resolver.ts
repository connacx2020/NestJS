import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { AppService } from './app.service';
import { AppInput, AppType } from './types/graphql-types';

@Resolver()
export class AppResolver {
    constructor(
        private readonly appService: AppService,
    ) { }

    @Query(() => String)
    async hello() {
        return "Hello es";
    }

    @Mutation(() => Boolean)
    async addData(@Args('input') input: AppInput) {
        const res = await this.appService.bulkInsert(input);
        return true;
    }

    @Query(() => [AppType])
    async getData() {
        const data = await this.appService.searchAll();
        const result = [];
        data.forEach(data => {
            result.push(data._source)
        });
        console.log(data);
        return result;
    }

}
