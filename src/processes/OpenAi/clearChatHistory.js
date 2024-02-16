import fs from 'fs';

const clearChatHistoryFile = () => {
  fs.writeFile('src\\processes\\OpenAi\\textFiles\\chatHistory.txt', '', (err) => {
    if (err) throw err;
    console.log('chatHistory.txt has been cleared.');
  });
};

// Call the function to clear the file
clearChatHistoryFile();
