export default async function getallStory(){
    const response= await fetch("http://localhost:3000/api/getstory");

    if(!response.ok){
      throw new Error("Category can't fetch")
    }

    return response.json()
}