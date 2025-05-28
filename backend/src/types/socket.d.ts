import 'socket.io';

declare module 'socket.io' {
  interface Socket {
    user?: any; // Or a specific user type like `UserPayload`
  }
}
