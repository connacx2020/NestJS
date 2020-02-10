import { Injectable, HttpException } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { AppInput } from './types/graphql-types';

@Injectable()
export class AppService {
  private readonly esclient: elasticsearch.Client;

  constructor() {
    this.esclient = new elasticsearch.Client({
      host: 'localhost:9200', // replace with your cluster endpoint
    });
    this.esclient.ping({ requestTimeout: 3000 })
      .catch(err => {
        throw new HttpException({
          status: 'error',
          message: 'Unable to reach Elasticsearch cluster'
        }, 500);
      });
  }
  async bulkInsert(abilities: any) {
    const bulk = [];
    bulk.push({
      index: { _index: 'pokemons', _type: 'abilities' }
    });
    bulk.push(abilities);
    return await this.esclient.bulk({
      body: bulk,
      index: 'pokemons',
      type: 'abilities'
    })
      .then(res => ({ status: 'success', data: res }))
      .catch(err => { throw new HttpException(err, 500); });
  }

  async searchAll() {
    const body = {
      size: 200,
      from: 0,
      query: {
        match_all: {},
      },
    };
    return await this.esclient.search({ index: 'pokemons', body})
      .then(res => res.hits.hits)
      .catch(err => { throw new HttpException(err, 500); });
  }
  // searches the 'pokemons' index for matching documents
  async searchIndex(q: string) {
    const body = {
      size: 200,
      from: 0,
      query: {
        match: {
          url: q,
        },
      },
    };
    return await this.esclient.search({ index: 'pokemons', body, q })
      .then(res => res.hits.hits)
      .catch(err => { throw new HttpException(err, 500); });
  }
}
