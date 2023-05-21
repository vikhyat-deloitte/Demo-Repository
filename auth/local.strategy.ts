import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt"
import { response } from "express";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly pService:PrismaService,private jwtService:JwtService){
        super()
    }
    async validate(uname:string,pwd:string):Promise<any>{
        let checkUser=null
        console.log("HERHEHREHRHE")
        try {
            console.log('ok',uname,pwd)
            let checkUser=await this.pService.user.findFirst({
                where:{
                    email:uname
                }
            })
            console.log(checkUser)
            if(!checkUser) throw new Error('User not found')
            if(!await bcrypt.compare(pwd,checkUser.password)){
                throw new Error('Incorrect Password')
            }
            const jwt=await this.jwtService.sign({id:checkUser.uId})
            console.log(jwt)
            // response.cookie('jwt',jwt,{httpOnly:true})
            return jwt
        } catch (error) {
            if(!checkUser) throw new HttpException(error.message,HttpStatus.UNAUTHORIZED)
        }
        
    }

}