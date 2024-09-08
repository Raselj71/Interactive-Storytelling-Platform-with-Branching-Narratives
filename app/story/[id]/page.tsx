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

         <div>
               <p className='text-3xl font-bold mt-3'>Story Title: {story.title}</p>

               <p className='mt-4 text-2xl'>{story.nodes[currentNode].text}</p>

               <div className='flex gap-10 mt-6'>
                     {story.nodes[currentNode].choices.map((item,index)=>(
                         <button className='hover:underline font-bold text-blue-600' onClick={()=>(handleClick(item.next))}>{item.text}</button>
                     ))}
               </div>
         </div>
        
        
    </div>
  )
}

export default page