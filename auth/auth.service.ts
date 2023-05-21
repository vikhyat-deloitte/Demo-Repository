import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { response } from 'express';
@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService,private readonly pService:PrismaService) {}
    async login(uname: any,pwd):Promise<any> {
        let checkUser=null,checkPwd=null
        try {
            checkUser=await this.pService.user.findFirst({
                where:{
                    email:uname
                }
            })
            console.log(checkUser,uname,pwd,"HERHERHEHRE")
            if(!checkUser) throw new Error('User not found')
            if(! await bcrypt.compare(pwd,checkUser.password)){
                throw new Error('Incorrect Password')
            }
            // const jwt=await this.jwtService.signAsync({id:checkUser.uId})
            
            // response.cookie('jwt',jwt,{httpOnly:true}) 
            if(checkUser) {
                return {
                    access_token: this.jwtService.sign({
                        user: checkUser.uId, sub: 1
                    }),
                    user:checkUser.uId,
                    name:checkUser.first_name
                }
            } else {
                return {
                    access_token:''
            }
            }
        } catch (error) {
            if(!checkUser) throw new HttpException(error.message,HttpStatus.UNAUTHORIZED)
            else if(!checkPwd) throw new HttpException(error.message,HttpStatus.UNAUTHORIZED)
        }
        
    }
    
    logout() {
        
    }
}