import { NextRequest, NextResponse } from "next/server";
import { StoryModel } from "@/Model/StoryModel";
import { connectdb } from "@/Config/dbconfig";


export async function POST(request:NextRequest){
   

    try {
        const conn= await connectdb()
         
        const {id}= await request.json()
       
         const data=await StoryModel.findById(id);
        

         
        return NextResponse.json({data, status:200})

    } catch (error) {
        return NextResponse.json({data:"Failed to getSingleStory", status:500})

        
    }



}