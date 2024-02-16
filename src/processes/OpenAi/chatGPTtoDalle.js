import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';

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

async function generateImages(prompt) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  if (!prompt) {
    prompt = "a cute angelic god-like border collie";
  }
  const numberOfImages = 1;
  const imageSize = "256x256";

  try {
    const imageGeneration = await openai.images.generate({
      prompt: prompt,
      n: numberOfImages,
      size: imageSize
    });

    console.log(imageGeneration);
    return imageGeneration;
  } catch (error) {
    console.error('Error generating images:', error);
  }
}

// Process input from command line arguments
const input = process.argv.slice(2).join(' '); // Get the output from ChatGPT

// Run DALL·E with the output from ChatGPT as prompt
(async () => {
  try {
    const generatedImages = await generateImages(input);
    appendToFile('src\\processes\\OpenAi\\dalleGenerations\\dalle_output.txt', JSON.stringify(generatedImages)); // Save the output to a file
  } catch (error) {
    console.error('Error:', error);
  }
})();
