import {connect} from '@/Configdb/config'
import User from '@/Models/UserSchema'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req:NextRequest):Promise<any>{
    try{

        let reqbody =await req.formData()
        let name =  reqbody.get('name') as string
        let email = reqbody.get('email') as string
        let password = reqbody.get('password') as string
        let image = reqbody.get('image') as string


        let newuser;
      

            newuser = await User.create({
                name,
                email,
                password,
                image,
            })
        

        let token = jwt.sign({id:newuser._id},process.env.SECRETKEY,{
            expiresIn:'1d'
        })

        cookies().set({
            name: 'tokenn',
            value: token,
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            httpOnly: true,
            path: '/',
          })


        return NextResponse.json({
            status:200,
            token,
            data:newuser
        })

    }catch(err){
        return NextResponse.json({
            status:204,
            message:'email already registered'
        })
    }
}