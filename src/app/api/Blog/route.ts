import {connect} from '@/Configdb/config';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import {Authrequest, protect } from '@/app/api/protectapi';
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
        let image = reqbody.get('bimage') as File
        let category = reqbody.get('category') as string
        let userid = currentuser._id
        let newblog;

        if(image !== undefined && image !== null){
            try{

                let byteData = await image.arrayBuffer()
                let buffer = Buffer.from(byteData)
                let path = `./public/blog/${image.name}`
                await writeFile(path,buffer)
                

            }catch(err){
                return NextResponse.json({
                    status:204,
                    message:'please login'
                })
            }
        

            newblog  =  await Blog.create({
                name,
                description,
                category,
                userid,
                image:image.name,
            })
        }
        else{

            newblog = await Blog.create({
                name,
                description,
                category,
                userid,
            })
        }

    

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