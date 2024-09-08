'use client'
import { useParams } from 'next/navigation'
import React, { useEffect,useState } from 'react'


function page() {
   const params=useParams()
   const id=params.id

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentNode, setNode]=useState(0)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/getsinglestory` , {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
                id
            }),
          });
        if (!response.ok) {
          throw new Error('Story not found');
        }
        const data = await response.json();
        console.log(data.data)
        setStory(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleClick=(id:any)=>{
     
    setNode(id)

  }

  return (
    <div className='mx-10 flex justify-center'>

         <div className='container flex flex-col items-center mt-10'>
               <p className='text-2xl font-bold mt-3 text-center'>Story Title: {story.title}</p>

               <p className='mt-4 text-xl text-center'>{story.nodes[currentNode].text}</p>

               <div className='flex  gap-2 mt-6 '>
                     {story.nodes[currentNode].choices.map((item,index)=>(
                         <button key={index} className='hover:underline  bg-green-500 text-white p-2 px-4 text-xs lg:text-base rounded-full  text-base' onClick={()=>(handleClick(item.next))}>{item.text}</button>
                     ))}
               </div>
         </div>
        
        
    </div>
  )
}

export default page