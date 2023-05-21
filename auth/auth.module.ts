import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";

@Module({
  imports: [PrismaModule,PassportModule, JwtModule.register({
    secret: 'test',
    signOptions: {expiresIn: '4d'}
})],
providers: [AuthService, LocalStrategy, JwtStrategy],
exports: [AuthService,LocalStrategy],
controllers:[AuthController]
})
export class AuthModule {}
