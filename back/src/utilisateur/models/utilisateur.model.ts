import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Utilisateur {
    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    @Field(() => ID)
    id: string;

    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;
}
