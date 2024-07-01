import User from "@/Models/UserSchema";
import pathdata from 'path'
import {writeFile,unlink} from "fs/promises";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
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
        let image = reqbody.get('image') as File
        let oldimage = reqbody.get('oldimage') as any

        let newuser;

        if(typeof image === 'string'){
            
            newuser  =  await User.findByIdAndUpdate(id,{image:image},{
                new:true,
                runValidators:true
            })

        }

        else if(image){
            try{

                let byteData = await image.arrayBuffer()
                let buffer = Buffer.from(byteData)
                let path = `./public/user/${image.name}`
                await writeFile(path,buffer)

                if(oldimage){
                    const oldimagepath = pathdata.join(__dirname,`public/user/${oldimage}`);

                    try {
                        await unlink(oldimagepath);
                    } catch (error:any) {
                        if (error.code !== 'ENOENT') {
                            console.error('Error deleting old image:', error);
                        } else {
                            console.log('Old image does not exist, no need to delete');
                        }
                    }
                }

            }catch(err){
                return err

            }

            newuser  =  await User.findByIdAndUpdate(id,{image:image.name},{
                new:true,
                runValidators:true
            })
              
        }
        


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