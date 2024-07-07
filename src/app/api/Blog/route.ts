import {connect} from '@/Configdb/config';
import { NextRequest, NextResponse } from 'next/server';
import {protect } from '@/app/api/protectapi';
import Blog from '@/Models/BlogSchema';

connect()


export async function POST(req:NextRequest): Promise<any>{
    try{

        let currentuser = await protect(req)
        
    
        if(!currentuser){
            return NextResponse.json({
                status:204,
                message:'please login'
            })
        }

        let reqbody = await req.formData()
        console.log(reqbody)
        let name = reqbody.get('bname') as string
        let description = reqbody.get('bdescription') as string
        let image = reqbody.get('bimage') as string
        let category = reqbody.get('category') as string
        let userid = currentuser._id

            let newblog = await Blog.create({
                name,
                description,
                image,
                category,
                userid,
            })

         return NextResponse.json({
            status:200,
            data:newblog
        })

    }catch(err){
         return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }
    
}

export async function GET(){
    try{

        let newblog = await Blog.find().populate('category').populate('userid')
        

         return NextResponse.json({
            status:200,
            data:newblog
        })

    }catch(err){
         return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }
}