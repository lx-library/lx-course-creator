import OpenAI from "openai";
import { useEffect } from "react";

const openai = new OpenAI();


async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);
  }

const AiAPI = () => {
    useEffect(() => {
        main()
    }, [])
    
    return(
        <div>AiAPI</div>
    )

}


export default AiAPI


