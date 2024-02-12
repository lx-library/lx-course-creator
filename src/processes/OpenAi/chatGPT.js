import { Configuration, OpenAIApi } from "openai"
import readline from "readline"
import fs from "fs"

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
)

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Function to append data to a file
const appendToFile = (data) => {
  fs.appendFile('output.txt', data + '\n', (err) => {
    if (err) throw err;
    console.log('Output saved to output.txt');
  });
}

userInterface.prompt()
userInterface.on("line", async input => {
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  })
  const output = response.data.choices[0].message.content;
  console.log(output); // Output to console
  appendToFile(output); // Append to file
  userInterface.prompt()
})
