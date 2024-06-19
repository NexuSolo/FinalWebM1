import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Utilisateur {

    @Field(type => ID)
    id: string;

    @Field(type => String)
    username: string;
}
