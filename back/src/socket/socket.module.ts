import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './socket.gateway';

@Module({
    providers: [WebsocketsGateway]
})
export class WebsocketsGatewayModule {}
