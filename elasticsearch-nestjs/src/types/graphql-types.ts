import { InputType, Field, ObjectType } from 'type-graphql';

@InputType()
export class AppInput {
  @Field()
    name: String;
  @Field()
    url: String;
}

@ObjectType()
export class AppType {
  @Field()
    name: String;
  @Field()
    url: String;
}
