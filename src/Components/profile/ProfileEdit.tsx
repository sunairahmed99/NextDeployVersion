"use client"
import {updateprofile, userdata } from '@/redux/Slice/UserSlice';
import {ref, uploadBytes,getDownloadURL,deleteObject} from 'firebase/storage'
import {storage} from '../../FirebaseConfig'
import Image from 'next/image';
import { AppDispatch } from '@/redux/store';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect}  from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

type Inputs = {
    image:string
  };



export default function ProfileEdit() {
    const {register, handleSubmit,formState: { errors } } = useForm<Inputs>();
    const dispatch = useDispatch<AppDispatch>()
    const[getimage,setimage] = React.useState()
    const {user} = useSelector(userdata)
    let {id} = useParams()
    const route = useRouter()
    const{errmsg,loading} = useSelector(userdata)
    

    const onSubmit: SubmitHandler<Inputs> =async data =>{

      let token = localStorage.getItem('token')
      let formData = new FormData()
      let url = user.image

      if(getimage){
            
        const file:any = getimage;
        const storageref = ref(storage, `images/${file.name}`);
        const delref = ref(storage,user.image);
        console.log(delref)
        deleteObject(delref).then(() => {
            console.log('deletedd')
          }).catch((error) => {
            console.log(error)
          });
        await uploadBytes(storageref, file);
        url = await getDownloadURL(storageref);

    }

    
      formData.append('image',url)

      const check = await dispatch(updateprofile({id,formData,token}))

      if(check.type === 'users/profile/fulfilled'){
        route.push('/profile')
      } 
    }

    useEffect(()=>{

      if(id !== user._id){

        return route.push('/profile')
      }

    },[id,route,user._id])
   
    
  return (
    <>
    {
        user && id == user._id &&
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Profile Edit Page
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-5" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-white">
                My Image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  {...register("image")}
                  type="file"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e:any) => setimage(e.target.files[0])}
                />
              </div>
              {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
            </div>
            <div>
              <div className="mt-2">
              {
                user && user.image ?   <Image
                className="h-[10px] w-[10px]"
                src={user?.image}
                alt=""
                height={20} width={20}  priority
              />: <Image
              className="h-[10px] w-[10px]"
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt=""
              height={200} width={200}  priority
            />
              }
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Profile
              </button>
              {loading && <p className='text-red-600 text-center'>processing...</p>}  
            {errmsg && <p className='text-red-600 text-center'>This Email Already Registered</p>}
            </div>
          </form>
        </div>
        </div>
    }
  </>
  )
}

