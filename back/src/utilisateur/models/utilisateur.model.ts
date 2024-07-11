import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Utilisateur {
    constructor(id: string, username: string, password: string, email: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    @Field(() => ID)
    id: string;

    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    email: string;
}
