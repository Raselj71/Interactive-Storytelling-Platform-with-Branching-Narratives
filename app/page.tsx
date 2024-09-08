

import getallStory from "@/Config/getAllStory";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";




export default async function Home() {

  const {data}= await getallStory()

 


   
 

  return (
    <main className="flex justify-center w-full ">

      <div className="container lg:w-1/2 mt-8 mx-10">

         <div>
            <div  className="absolute right-[10%] lg:right-[25%] top-[80%] z-50">
              <Link href={'/create'}> <button className="bg-green-500 text-white size-[50px] rounded-full flex justify-center items-center"><FaPlus/></button> </Link>
            </div>
              
         </div>
         <div className="text-center text-2xl font-bold">
            Read Story
         </div>
         <hr></hr>
        <div className="flex flex-wrap flex-col lg:items-center gap-4 mt-8">

        {data.map((item:any ,index:any)=>(
              <div className="bg-green-400 text-white rounded-md font-bold text-xl px-4 py-2 hover:bg-red-500  flex items-center justify-between w-full  " key={index}>
                  <Link className="hover:underline" href={`/story/${item._id}`}>  {item.title}</Link>
                  <button className="text-2xl"><IoIosArrowForward/></button>
              </div>
         ))}
        </div>

      </div>

    





    </main>
  );
}
