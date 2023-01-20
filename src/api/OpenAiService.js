// Show and tell. Make it clear what you want either through instructions, examples, or a combination of the two. If you want the model to rank a list of items in alphabetical order or to classify a paragraph by sentiment, show it that's what you want.

// Provide quality data. If you're trying to build a classifier or get the model to follow a pattern, make sure that there are enough examples. Be sure to proofread your examples — the model is usually smart enough to see through basic spelling mistakes and give you a response, but it also might assume this is intentional and it can affect the response.

// Check your settings. The temperature and top_p settings control how deterministic the model is in generating a response. If you're asking it for a response where there's only one right answer, then you'd want to set these lower. If you're looking for more diverse responses, then you might want to set them higher. The number one mistake people use with these settings is assuming that they're "cleverness" or "creativity" controls.

// Troubleshooting
// If you're having trouble getting the API to perform as expected, follow this checklist:

// Is it clear what the intended generation should be?
// Are there enough examples?
// Did you check your examples for mistakes? (The API won't tell you directly)
// Are you using temperature and top_p correctly?


class OpenAiService {

  constructor(){
    this.secret = "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"
    this.url = "https://api.openai.com/v1/completions"
  }

  async newMessage(flatInfo, profileString){
    const response = await fetch('https://spareroom-ext-server.vercel.app/newmessage', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({flatInfo, profileString})
    })
    if (response.ok){
      const data = await response.json();
      return data
    } else{
      return false;
    }
  }


}

export default OpenAiService;



// max_tokens
// integer
// Optional
// Defaults to 16
// The maximum number of tokens to generate in the completion.

// The token count of your prompt plus max_tokens cannot exceed the model's context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).

// temperature
// number
// Optional
// Defaults to 1
// What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer.

// We generally recommend altering this or top_p but not both.

// top_p
// number
// Optional
// Defaults to 1
// An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

// We generally recommend altering this or temperature but not both.

// n
// integer
// Optional
// Defaults to 1
// How many completions to generate for each prompt.

// Note: Because this parameter generates many completions, it can quickly consume your token quota. Use carefully and ensure that you have reasonable settings for max_tokens and stop.

// stream
// boolean
// Optional
// Defaults to false
// Whether to stream back partial progress. If set, tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.

// logprobs
// integer
// Optional
// Defaults to null
// Include the log probabilities on the logprobs most likely tokens, as well the chosen tokens. For example, if logprobs is 5, the API will return a list of the 5 most likely tokens. The API will always return the logprob of the sampled token, so there may be up to logprobs+1 elements in the response.

// The maximum value for logprobs is 5. If you need more than this, please contact us through our Help center and describe your use case.

// echo
// boolean
// Optional
// Defaults to false
// Echo back the prompt in addition to the completion

// stop
// string or array
// Optional
// Defaults to null
// Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.