import mongoose from "mongoose";

let isConnected = false; 

export async function connectdb() {
  if (isConnected) {
    console.log("already connected")
    return;
  }

  try {
    const conn = await mongoose.connect("mongodb+srv://alexkrein9:rasel123@cluster0.odeuf.mongodb.net/");
    isConnected = true;
    console.log('database connected')
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; 
  }
}



