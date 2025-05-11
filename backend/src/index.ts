// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import { ChatOpenAI } from '@langchain/openai';
// import { PromptTemplate } from '@langchain/core/prompts';
// import { RunnableSequence } from '@langchain/core/runnables';

// dotenv.config();

// const app = express();
// const PORT = 3001;

// app.use(cors());
// app.use(express.json());

// app.post('/api/query', async (req, res) => {
//   const { query } = req.body;
//   console.log("Received Query:", query);

//   try {
//     const model = new ChatOpenAI({
//       temperature: 0.7,
//       openAIApiKey: process.env.OPENAI_API_KEY,
//       modelName: 'gpt-3.5-turbo',
//       configuration: {
//         organization: process.env.OPENAI_ORG_ID,
//         project: process.env.OPENAI_PROJECT_ID,
//       },
//     });

//     const prompt = new PromptTemplate({
//       template:
//         'You are a sustainability consultant for cloud-based applications. Analyze the following decision or design in terms of energy efficiency and suggest improvements:\n\n"{input}"',
//       inputVariables: ['input'],
//     });

//     // ✅ Use RunnableSequence instead of deprecated LLMChain
//     const chain = RunnableSequence.from([prompt, model]);

//     const result = await chain.invoke({ input: query });

//     res.json({ response: result.content }); // NOTE: use .content instead of .text
//   } catch (error) {
//     console.error('LLM Error:', error);
//     res.status(500).json({ response: 'Something went wrong with the AI.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { ChatGroq } from '@langchain/groq';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';

import { initDb, db } from './database';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/query', async (req, res) => {
  const { query } = req.body;
  console.log('Received Query:', query);

  try {
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY!,
      model: 'llama3-8b-8192',
    });

    const prompt = PromptTemplate.fromTemplate(
      `You are a sustainability consultant for cloud-based applications.
Analyze the following decision or design in terms of energy efficiency and suggest improvements:

"{input}"`
    );

    const chain = RunnableSequence.from([
      prompt,
      model,
      new StringOutputParser()
    ]);

    const response = await chain.invoke({ input: query });

    // Save to DB
    await db.run(
      'INSERT INTO queries (query, response) VALUES (?, ?)',
      [query, response]
    );

    res.json({ response });
  } catch (error) {
    console.error('LLM Error:', error);
    res.status(500).json({ response: 'Something went wrong with the AI.' });
  }
});

// Ensure DB is initialized before server starts
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err);
});




