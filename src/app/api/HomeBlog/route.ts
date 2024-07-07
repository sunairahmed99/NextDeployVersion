import {connect} from '@/Configdb/config';
import Hblog from '@/Models/HomeBlogSchema';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function POST(req:NextRequest):Promise<any>{
    try{

        let reqbody = await req.formData()
        let name = reqbody.get('bname') as string
        let description = reqbody.get('bdescription') as string
        let image = reqbody.get('bimage') as string
        let category = reqbody.get('category') as string


            let newblog = await Hblog.create({
                name,
                description,
                image,
                category,
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

export async function GET():Promise<any>{
    try{

        let newblog = await Hblog.find().populate('category')

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