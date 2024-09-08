const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  nodeId: { type: Number, required: true },
  text: { type: String, required: true },
  choices: [{ text: String, next: Number }]
});

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  nodes: [nodeSchema]
});

export const StoryModel =mongoose.models.StoryModel || mongoose.model('StoryModel', storySchema);
