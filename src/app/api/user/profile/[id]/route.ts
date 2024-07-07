import User from "@/Models/UserSchema";
import {NextResponse } from "next/server";
import {connect} from "@/Configdb/config"
import {Authrequest,protect } from "@/app/api/protectapi";

connect()



export async function PATCH(req:Authrequest,{params}:{params:{id:string}}):Promise<any>{

    try{
        let currentuser = await protect(req)
        
    
        if(!currentuser){
            return NextResponse.json({
                status:204,
                message:'please login'
            })
        }
        
        let {id} = params

        let reqbody =await req.formData()
        let image = reqbody.get('image') as string
        let oldimage = reqbody.get('oldimage') as string

            let newuser  =  await User.findByIdAndUpdate(id,{image},{
                new:true,
                runValidators:true
            })

            return NextResponse.json({
                status:200,
                data:newuser
            })  

    }catch(err){
        console.log(err)
        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }

}