import User from "@/Models/UserSchema";
import fs from 'fs';
import pathdata from 'path'
import {writeFile,unlink} from "fs/promises";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/Configdb/config"
import {Authrequest,protect } from "@/app/api/protectapi";

connect()

export async function POST(){}

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
        console.log(oldimage)

        let newuser;

        if(typeof image === 'string'){
            
            newuser  =  await User.findByIdAndUpdate(id,{image:image},{
                new:true,
                runValidators:true
            })

            return NextResponse.json({
                status:200,
                data:newuser
            })

        }

        else if(image){
            try{
                console.log('checkk')

                let byteData = await image.arrayBuffer()
                let buffer = Buffer.from(byteData)
                let path = `./public/user/${image.name}`
                await writeFile(path,buffer)

                if(oldimage){

                    const folderpath = pathdata.join(process.cwd(), 'public','user');
                    const oldimagepath = pathdata.join(folderpath,oldimage);
                    await fs.promises.writeFile(folderpath, image.name);
                
                    // if (fs.existsSync(oldimagepath)) {
                    //     await fs.promises.unlink(oldimagepath);
                    //     console.log('File deleted successfully');
                    // } else {
                    //     console.log('File does not exist');
                    // }
                }
                

            }catch(err){
                console.log(err)
                return NextResponse.json({
                    status:200,
                    data:err
                }) 

            }
            console.log('check again')
            newuser  =  await User.findByIdAndUpdate(id,{image:image.name},{
                new:true,
                runValidators:true
            })

            return NextResponse.json({
                status:200,
                data:newuser
            })  
        }

        return NextResponse.json({
            status:200,
            data:'success'
        })
        


       

    }catch(err){
        console.log(err)
        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }

}