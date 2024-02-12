import OpenAI from 'openai';



async function generateImages(prompt) {
  const openai = new OpenAI({
    apiKey: "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"
  });


  if(!prompt){
    prompt = "a cute border colly"
  }
  const numberOfImages = 1;
  const imageSize = "256x256";

  try {
    const imageGeneration = await openai.images.generate({
      prompt: prompt,
      n: numberOfImages,
      size: imageSize
    });

    console.log(imageGeneration)
    return imageGeneration
  } catch (error) {
    console.error('Error generating images:', error);
  }
}

// Call the async function
generateImages();
