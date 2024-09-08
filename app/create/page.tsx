'use client'
import React, { useState } from 'react';

const StoryForm = () => {
  const [title, setTitle] = useState('');
  const [nodes, setNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState({ nodeId: nodes.length + 1, text: '', choices: [] });

  const handleAddNode = () => {
    setNodes([...nodes, currentNode]);
    setCurrentNode({ nodeId: nodes.length + 2, text: '', choices: [] });
  };

  const handleAddChoice = (nodeId:any) => {
    const newChoiceText = prompt("Enter choice text:");
    const nextNodeId = parseInt(prompt("Enter next node ID:"), 10);
    
    if (newChoiceText && !isNaN(nextNodeId)) {
      const updatedNodes = nodes.map(node => {
        if (node.nodeId === nodeId) {
          return { ...node, choices: [...node.choices, { text: newChoiceText, next: nextNodeId }] };
        }
        return node;
      });
      setNodes(updatedNodes);
    }
  };

  const handleSubmit = async () => {
    const storyData = { title, nodes };
    console.log(storyData)
    
    try {
      const response = await fetch('/api/addstory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyData),
      });
      
      if (response.ok) {
        alert("Story created successfully!");
        setTitle('');
        setNodes([]);
      } else {
        alert("Failed to create story.");
      }
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  return (
    <div className='w-full flex justify-center'>

<div className='container mt-10 mx-10'>
      <h1 className='text-2xl font-bold text-center text mb-1'>Create a New Story</h1>
      <hr/>
      <input
        className='mt-2 border rounded-md w-full  h-12 px-2'
        type="text"
        placeholder="Story Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
     
      <div>
        <h3 className='text-xl font-bold text'>Current Node</h3>
        <input
         className='mt-2 border w-full  h-12 px-2'
          type="text"
          placeholder="Node Text"
          value={currentNode.text}
          onChange={(e) => setCurrentNode({ ...currentNode, text: e.target.value })}
        />
        <button className='mt-4 w-full py-2 rounded-sm bg-green-500 text-white font-medium' onClick={handleAddNode}>Add Node</button>
      </div>
      <h2 className='text-xl mt-4 font-bold text-center '>Nodes List</h2>
      <hr></hr>
      {nodes.map(node => (
        <div key={node.nodeId}>
          <h3 className='text-xl font-semibold '>Node {node.nodeId}</h3>
          <p>{node.text}</p>
          <button className='bg-green-500  px-6 m-2 text-white rounded-sm py-2' onClick={() => handleAddChoice(node.nodeId)}>Add Choice</button>
          <ol type='number' >
            {node.choices.map((choice, index) => (
              <li className='text-lg' key={index}>{choice.text} (leads to node {choice.next})</li>
            ))}
          </ol>
        </div>
      ))}
      <button className='text-xl px-6  bg-green-500 text-white py-3 rounded-md hover:bg-red-500' onClick={handleSubmit}>Submit Story</button>
    </div>
    </div>
  );
};

export default StoryForm;
