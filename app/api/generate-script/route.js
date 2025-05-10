// app/api/generate-script/route.js

import { generateScript } from "@/configs/aiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `write a two different script for 30 Seconds video on Topic:{topic},
          Do not add Scene Description
          
          Do not add anything in Braces, just return the plain story in text
          
          -Give me response in JSON format and follow the schema
          -{
            scripts:[
             {
              content:''
             },
             ],
          }`;

export async function POST(req) {
  const { topic } = await req.json();

  const PROMPT = SCRIPT_PROMPT.replace("{topic}", topic);
  
  const result = await generateScript(PROMPT); // pass prompt to generateScript

  // result is already parsed JSON from generateScript
  return NextResponse.json(result);
}
