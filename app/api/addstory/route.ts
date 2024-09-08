import { NextRequest, NextResponse } from "next/server";
import { StoryModel } from "@/Model/StoryModel";
import { connectdb } from "@/Config/dbconfig";


const stories = [
    {
      title: "The Enchanted Forest",
      nodes: [
        { nodeId: 1, text: "You are an adventurer in the Enchanted Forest. After traveling, you reach a clearing where three paths lie ahead.", choices: [{ text: "Take the left path", next: 2 }, { text: "Take the middle path", next: 3 }, { text: "Take the right path", next: 4 }] },
        { nodeId: 2, text: "You take the left path and find an abandoned cabin.", choices: [{ text: "Enter the cabin", next: 5 }, { text: "Keep walking", next: 6 }] },
        { nodeId: 3, text: "You take the middle path and find a hidden village.", choices: [{ text: "Talk to the villagers", next: 7 }, { text: "Avoid the village", next: 8 }] },
        { nodeId: 4, text: "You take the right path, encountering thorny vines.", choices: [{ text: "Fight the vines", next: 9 }, { text: "Let the vines pull you in", next: 10 }] },
        { nodeId: 5, text: "Inside the cabin, you find a mysterious map leading to treasure.", choices: [{ text: "Take the map", next: 11 }, { text: "Leave the map and exit the cabin", next: 12 }] },
        { nodeId: 6, text: "You keep walking and stumble upon a wolf's den.", choices: [{ text: "Fight the wolf", next: 13 }, { text: "Run away", next: 14 }] },
        { nodeId: 7, text: "The villagers welcome you and offer you a quest to find a magical artifact.", choices: [{ text: "Accept the quest", next: 15 }, { text: "Decline the quest", next: 16 }] },
        { nodeId: 8, text: "You avoid the village and wander into a dangerous swamp.", choices: [{ text: "Explore the swamp", next: 17 }, { text: "Turn back", next: 18 }] },
        { nodeId: 9, text: "You manage to fight off the vines but get injured.", choices: [{ text: "Look for help", next: 19 }, { text: "Keep going", next: 20 }] },
        { nodeId: 10, text: "The vines pull you into a hidden cave. You find ancient drawings.", choices: [{ text: "Study the drawings", next: 21 }, { text: "Try to escape the cave", next: 22 }] },
        { nodeId: 11, text: "You follow the map deep into the forest and find a treasure chest.", choices: [] },
        { nodeId: 12, text: "You leave the cabin and return to the clearing. The adventure is over.", choices: [] }, 
        { nodeId: 13, text: "You defeat the wolf and find a hidden cave behind its den.", choices: [] },
        { nodeId: 14, text: "You run away safely but end up at a cliffside.", choices: [] },
        { nodeId: 15, text: "You find the magical artifact and complete the quest. The villagers celebrate your return.", choices: [] }, 
        { nodeId: 16, text: "You decline the quest and leave the village. The adventure is over.", choices: [] }, 
        {nodeId:17,  text:"You explore the swamp but fall into quicksand and perish. The end.", choices: [] },
        {nodeId:18, text: "You return to the village and live a peaceful life. The end.", choices: []},
        {nodeId:19, text: "You find help in the village and are healed. You live there. The end.", choices: []},
        {nodeId:20, text: "You keep moving but succumb to your injuries. The end.", choices: []},
        {nodeId:21, text: "You take the treasure but are trapped in the cave forever. The end.", choices: []},
        {nodeId:22, text: "You escape the cave and live to tell the tale. The end.", choices: []}
      ]
    },
   ]
  


export async function GET(req:NextRequest){

    try {
        

        await connectdb()

        await StoryModel.insertMany(stories)
        return NextResponse.json({data:stories, status:200})



    } catch (error) {
        return NextResponse.json({data:"Failed to insert", status:500})

        
    }



}