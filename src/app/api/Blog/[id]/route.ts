import {connect} from '@/Configdb/config';
import { NextRequest, NextResponse } from 'next/server';
import Blog from '@/Models/BlogSchema';


connect()

export async function GET(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{

        let {id} = params
        let newblog = await Blog.findById(id).populate('category')

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

export async function PATCH(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{
        let {id} = params

        let reqbody =await req.formData()
        let name = reqbody.get('name') as string
        let description = reqbody.get('description') as string
        let category = reqbody.get('category') as string
        let image = reqbody.get('image') as string
      

            let newblog = await Blog.findByIdAndUpdate(id,{name,description,image,category,},{
                new:true,
                runValidators:true
            })

            return NextResponse.json({
                status:200,
                image,
                data:newblog
            })
        
    }catch(err){
        
        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }
}

export async function DELETE(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{

        let {id} = params

        let newblog = await Blog.findByIdAndDelete(id)


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