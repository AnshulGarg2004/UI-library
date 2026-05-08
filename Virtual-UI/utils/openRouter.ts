import axios from "axios";
import { NextResponse } from "next/server"

interface fetchAIProps {
    role : string;
    content : string;
}

export const fetchAi = async (message : fetchAIProps[]) => {
    try {
        if(!message || !Array.isArray(message)  || message.length == 0) {
            return NextResponse.json({success : false, message : "Message is invalid"}, {status :500});
        }
    
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model : "deepseek/deepseek-chat",
            messages : message,
            temperature : 0.8,
            max_tokens : 2000,
            response_format : {type : "json_object"}
        }, {
            headers : {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'X-OpenRouter-Title': 'Virtual UI', 
                'Content-Type': 'application/json',
            }
        })
    
        console.log("Response from openrouter: ", response);
    
        const content = response?.data?.choices?.[0]?.message?.content;

        if(!content || !content.trim()) {
            return NextResponse.json({success : false, message : "AI returned empty response"}, {status : 400});
        }

        return NextResponse.json({success : true, message : "Response from AI fetched successfully" , content}, {status : 200});
    } catch (error : any) {
        console.log("Error in catch of open router: ", error.message);
        return NextResponse.json({success : false, message : "Error occured in fetching response"}, {status : 500});
    }

}