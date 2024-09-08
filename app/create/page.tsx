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
      const response = await fetch('/stories', {
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

<div className='mt-6 '>
      <h1 className='text-2xl font-bold text'>Create a New Story</h1>
      <input
        className='mt-2 border w-[30rem]  h-12 px-2'
        type="text"
        placeholder="Story Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h2 className='text-2xl font-bold text'>Nodes</h2>
      <div>
        <h3 className='text-xl font-bold text'>Current Node</h3>
        <input
         className='mt-2 border w-[30rem]  h-12 px-2'
          type="text"
          placeholder="Node Text"
          value={currentNode.text}
          onChange={(e) => setCurrentNode({ ...currentNode, text: e.target.value })}
        />
        <button className='mx-3 h-12 p-4 bg-green-500 text-white font-medium' onClick={handleAddNode}>Add Node</button>
      </div>
      <h2 className='text-2xl font-bold text'>Nodes List</h2>
      {nodes.map(node => (
        <div key={node.nodeId}>
          <h3 className='text-xl font-semibold '>Node {node.nodeId}</h3>
          <p>{node.text}</p>
          <button className='bg-green-500  px-6 m-2 text-white rounded-sm py-2' onClick={() => handleAddChoice(node.nodeId)}>Add Choice</button>
          <ul>
            {node.choices.map((choice, index) => (
              <li className='text-lg' key={index}>{choice.text} (leads to node {choice.next})</li>
            ))}
          </ul>
        </div>
      ))}
      <button className='text-xl px-6  bg-green-500 text-white py-3 rounded-md hover:bg-red-500' onClick={handleSubmit}>Submit Story</button>
    </div>
    </div>
  );
};

export default StoryForm;
