import {connect} from '@/Configdb/config';
import { NextRequest, NextResponse } from 'next/server';
import Hblog from '@/Models/HomeBlogSchema';


connect()

export async function GET(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{

        let {id} = params
        let newblog = await Hblog.findById(id).populate('category')

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

        let newblog;

            newblog = await Hblog.findByIdAndUpdate(id,{name,description,image,category,},{
                new:true,
                runValidators:true
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

export async function DELETE(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{

        let {id} = params

        let newblog = await Hblog.findByIdAndDelete(id)


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