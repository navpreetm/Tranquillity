import OpenAI from "openai";
import { get_encoding } from "tiktoken";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const encoding = get_encoding("cl100k_base")

/**
 * Given a prompt, return a message from the AI and the tokens used
 * @param {*} request: contains the JSON object with the prompt
 *    text: a string containing the prompt for the AI
 * @returns JSON object with the result and the tokens used
 *    result: the response from the AI
 *    tokens_used: the number of tokens used in the response
 */
export async function POST(request) {
  // message is a JSON object with the text property
  // the text property contains the prompt for the AI
  let message = await request.json()

  // tokens used in the input
  const tokens = encoding.encode(message.text)
  const tokens_used = tokens.length

  // if too many, reject input
  if (tokens_used > 1024) {
    return new Response(JSON.stringify({
      error: "Input too long"
    }), { status: 400 });
  }

  // current completion method
  // do not consider history or prior messages in the conversation
  // only consider the current message
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "Help me understand my thoughts, emotions and behaviors. \nThen, provide another writing prompt to help me for deeper reflection. \n\n\nExamples:\nI'm glad to hear you had a great day connecting with friends and exploring! For further thinking: Write about a time when you felt completely at peace and content with the present moment. What were you doing, and what made that experience so special for you?\n\nLIMITATIONS:\nYour response should be 4 sentences or less.\nThe response should be formatted as a single paragraph\nAim for a casual and friendly tone."
          }
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": message.text
          }
        ]
      }
    ],
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "text"
    },
  });

  // if gpt failed, error
  if (completion.error) {
    return new Response(JSON.stringify({
      error: completion.error.message
    }), { status: 400 });
  }

  // if success:
  // read # of tokens used
  // return new message
  const total_tokens_used = completion.usage.total_tokens
  const reply = completion.choices[0].message.content

  return new Response(JSON.stringify({
    result: reply,
    tokens_used: total_tokens_used
  }), { status: 200 });
}
