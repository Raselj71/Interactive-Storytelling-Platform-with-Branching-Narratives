import { NextRequest, NextResponse } from "next/server";
import { StoryModel } from "@/Model/StoryModel";
import { connectdb } from "@/Config/dbconfig";




export async function POST(req:NextRequest){

    try {
        

        await connectdb()
        const {title,nodes}= await req.json()
        const Story=new StoryModel({title,nodes})
        await Story.save()
         
        return NextResponse.json({Story, status:200})



    } catch (error) {
        return NextResponse.json({data:"Failed to insert", status:500})

        
    }



}