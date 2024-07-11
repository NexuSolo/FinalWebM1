import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io-client';

@Injectable()
export class SocketService {
    private socket: Socket;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.socket = require('socket.io-client')('ws://localhost:3000');
        this.setupSocketEvents();
    }

    private setupSocketEvents() {
        this.socket.on('messageToClient', (data) => {
            console.log(`Received serverEvent: ${data}`);
        });
    }

    emitClientEvent(payload: any) {
        console.log(payload);
        this.socket.emit('messageToServer', payload);
    }
}
