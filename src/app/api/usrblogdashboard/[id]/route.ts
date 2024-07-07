import {connect} from '@/Configdb/config';
import Blog from '@/Models/BlogSchema';
import {NextResponse } from 'next/server';
import {Authrequest,protect } from '../../protectapi';

connect()

export async function POST(){}

export async function GET(req:Authrequest):Promise<any>{
    try{
         
        let currentuser = await protect(req)
        
    
        if(!currentuser){
            return NextResponse.json({
                status:204,
                message:'please login'
            })
        }

        let newblog = await Blog.find({userid:currentuser._id}).populate('category').populate('userid')        

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