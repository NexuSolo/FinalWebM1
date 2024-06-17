import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Message {

    @Field(type => Int)
    id: number;

    @Field(type => String)
    test: string;

}
