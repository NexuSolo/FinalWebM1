import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {

    findAll() {
        return [
            {
                id: 1,
                test: 'test'
            }
        ];
    }
}
