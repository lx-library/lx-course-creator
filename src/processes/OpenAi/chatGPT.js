import OpenAI from 'openai';
import fs from 'fs';
import dotenv from 'dotenv';
import { exec } from 'child_process';

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to append data to a file
const appendToFile = (filename, data) => {
  fs.appendFile(filename, data + '\n', (err) => {
    if (err) throw err;
    console.log('Data saved to', filename);
  });
};

// Function to run chatGPTtoDalle.js with the provided output
const runChatGPTtoDalle = (output) => {
  exec(`node src/processes/OpenAi/chatGPTtoDalle.js "${output}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing chatGPTtoDalle.js: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr while executing chatGPTtoDalle.js: ${stderr}`);
      return;
    }
    console.log(`chatGPTtoDalle.js executed successfully:\n${stdout}`);
  });
};

// Array to store conversation history
let conversationHistory = [];

const processInput = async (input) => {
  const promptPhrase = "generate a 40 word prompt to an AI image generator";

  // Add user input to conversation history
  conversationHistory.push({ "role": "user", "content": input });

  // Check if the input contains the prompt phrase case-insensitively
  if (input.toLowerCase().includes(promptPhrase.toLowerCase())) {
    // If the input contains the prompt phrase, generate a new output using ChatGPT with conversation history
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
    });
    const newOutput = chatCompletion.choices[0].message.content;

    // Append new output to conversation history
    conversationHistory.push({ "role": "assistant", "content": newOutput });

    // Append conversation history to files
    fs.appendFile('src/processes/OpenAi/textFiles/chatHistory.txt', JSON.stringify(conversationHistory) + '\n', (err) => {
      if (err) throw err;
      console.log('Conversation history saved to chatHistory.txt');
    });

    // Run chatGPTtoDalle.js with the new output
    runChatGPTtoDalle(newOutput);

    // Append new output to output.txt
    appendToFile('src/processes/OpenAi/textFiles/output.txt', newOutput);
  } else {
    // If the input does not contain the prompt phrase, proceed with ChatGPT as usual
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
    });
    const output = chatCompletion.choices[0].message.content;

    // Append assistant output to conversation history
    conversationHistory.push({ "role": "assistant", "content": output });

    // Append conversation history to files
    fs.appendFile('src/processes/OpenAi/textFiles/chatHistory.txt', JSON.stringify(conversationHistory) + '\n', (err) => {
      if (err) throw err;
      console.log('Conversation history saved to chatHistory.txt');
    });

    // Append output to output.txt
    appendToFile('src/processes/OpenAi/textFiles/output.txt', output);
  }
};

// Start listening for inputs
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  const input = chunk.trim(); // Trim whitespace

  // Save each input as a string
  appendToFile('src/processes/OpenAi/textFiles/input.txt', input);

  // Process the input
  processInput(input);
});
