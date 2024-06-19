import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Utilisateur {
    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }

    @Field(type => ID)
    id: string;

    @Field(type => String)
    username: string;
}
