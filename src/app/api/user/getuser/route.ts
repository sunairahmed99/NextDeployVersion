import { NextRequest, NextResponse } from "next/server";
import { Authrequest, protect } from "@/app/api/protectapi";
import { cookies } from 'next/headers'


export async function POST(req: NextRequest) {}

export async function GET(req:Authrequest):Promise<any>{
    try{

        let currentuser = await protect(req)
    
        if(!currentuser){
            return NextResponse.json({
                status:204,
                message:'please login'
            })
        }
    
        return NextResponse.json({
            status:200,
            data:currentuser
        })

    }catch(err){
        cookies().delete('tokenn')
        return NextResponse.json({
            status:204,
            data:err
        })

    }
}

