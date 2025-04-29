const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: "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",
});

const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [
        { "role": "user", "content": "write a haiku about ai" },
    ],
});

completion.then((result) => console.log(result.choices[0].message));