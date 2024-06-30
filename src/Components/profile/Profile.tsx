"use client"
import { userdata } from '@/redux/Slice/UserSlice'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
    const{user} = useSelector(userdata)
    let userdatas = user && user
    
    
  return (
    <>
    {userdatas && 

    <div className=" mt-[-40px] h-screen bg-blue-900  dark:bg-blue-900  flex flex-wrap items-center  justify-center  ">
  <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-blue-600 text-whites  shadow-lg    transform   duration-200 easy-in-out">
    <div className=" h-32 overflow-hidden">
      {
        userdatas && userdatas.image ?   <Image
        className="w-full"
        src={`/user/${userdatas?.image}`}
        alt=""
        height={200} width={200}  priority
      />: <Image
      className="w-full"
      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      alt=""
      height={200} width={200}  priority
    />
      }
     
    </div>
    <div className="flex justify-center px-5  -mt-12">
    {
        userdatas && userdatas.image ?   <Image
        className="w-full"
        src={`/user/${userdatas?.image}`}
        alt=""
        height={20} width={20}  priority
      />: <Image
      className="w-full"
      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      alt=""
      height={200} width={200}  priority
    />
      }
    </div>
    <div className=" ">
      <div className="text-center px-14">
        <h2 className="text-white text-3xl font-bold">{userdatas.name}</h2>
      </div>
      <hr className="mt-6" />
      <div className="flex  bg-gray-50 ">
        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
          <p>
            <span className="font-semibold">{userdatas?.email}</span> 
          </p>
        </div>
        <div className="border" />
        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
          <Link href={`/profile/${userdatas?._id}`}>
           Edit
          </Link>
        </div>
      </div>
    </div>
  </div>
   </div>
    }
    </>
  )
}
