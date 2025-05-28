import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwt.config';
import { Socket } from 'socket.io';
dotenv.config();

@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const client:Socket = context.switchToWs().getClient<Socket>();
        const token = (client as any).handshake.auth?.token || (client as any).handshake.headers?.authorization?.split(' ')[1];;

        if (!token) throw new UnauthorizedException('Missing token');

        try {
            const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret });
            console.log("Auth is done: ", decoded);
            client.user = decoded;
            console.log("User is provided to client: ", client.user);
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
