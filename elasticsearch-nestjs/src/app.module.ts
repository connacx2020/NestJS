import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlDistributedModule } from 'nestjs-graphql-gateway';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphqlDistributedModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: (ctx) => ctx,
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
