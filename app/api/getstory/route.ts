import { NextRequest, NextResponse } from "next/server";
import { StoryModel } from "@/Model/StoryModel";
import { connectdb } from "@/Config/dbconfig";


export async function GET(req:NextRequest){

    try {
        
        await connectdb()

       const data= await StoryModel.find()
        return NextResponse.json({data, status:200})

    } catch (error) {
        return NextResponse.json({data:"Failed to insert", status:500})

        
    }



}