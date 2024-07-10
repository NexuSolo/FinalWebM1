import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true
    }
})
export class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private clients: Set<Socket> = new Set();

    @WebSocketServer() server: Server;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterInit(server: Server) {
        console.log('WebSocket Gateway initialized');
    }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        this.clients.add(client);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.clients.delete(client);
    }

    @SubscribeMessage('messageToServer')
    handleMessage(client: Socket, payload: any): void {
        const message = {
            authorId: payload.authorId,
            createdAt: payload.createdAt,
            id: payload.id,
            text: payload.text
        };
        this.server.emit(payload.conversationId, message);
    }
}
