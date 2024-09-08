

import getallStory from "@/Config/getAllStory";
import Link from "next/link";




export default async function Home() {

  const data=  await getallStory()
 const maindata=data.data;

   
 

  return (
    <main className="flex justify-start w-full mx-10">

      <div className="container mt-8">

         <div>
            <div>
              <Link href={'/create'}> Create your own Story</Link>
            </div>
              
         </div>
         <div className="text-center text-2xl font-bold">
            Read Story
         </div>
        <div className="flex flex-wrap">

        {maindata.map((item:any ,index:any)=>(
              <div className="bg-green-400 text-white rounded-md font-bold text-3xl hover:bg-red-500  p-10 " key={index}>
                  <Link className="hover:underline" href={`/story/${item._id}`}>  {item.title}</Link>
              </div>
         ))}
        </div>

      </div>

    





    </main>
  );
}
