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

  async generateMessage(){

    const reqBody = {
      model: "text-davinci-003",
      prompt: "What is 2+2?",
      max_tokens: 7,
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: ""
    }

    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.secret}`
      },
      body: JSON.stringify(reqBody)
    });
    const data = await response.json();
    return data;
  }
}

export default OpenAiService;