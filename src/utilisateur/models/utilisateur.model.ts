import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Utilisateur {

    @Field(type => ID)
    id: number;

    @Field(type => String)
    username: string;
}
