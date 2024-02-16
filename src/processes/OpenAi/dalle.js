import OpenAI from 'openai';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function generateImages(prompt) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  if (!prompt) {
    prompt = "a cute border colly";
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

// Call the async function
generateImages();
