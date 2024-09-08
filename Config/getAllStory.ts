import axios from "axios";
export default async function getallStory(){
    const response= await axios.get('http://localhost:3000/api/getstory');

   return response.data
}