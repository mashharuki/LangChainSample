import {ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {HttpResponseOutputParser} from "langchain/output_parsers";
import * as dotenv from "dotenv";

dotenv.config();

const {OPENAI_API_KEY} = process.env;

/**
 * mainスクリプト
 */
const main = async () => {
  console.log(`
        ================================ [START] ================================
    `);

  const TEMPLATE = `
        You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.

        {input}
    `;

  // プロンプトを作成
  const prompt: ChatPromptTemplate = ChatPromptTemplate.fromTemplate(TEMPLATE);

  const model = new ChatOpenAI({
    apiKey: OPENAI_API_KEY!,
    temperature: 0.8,
    model: "gpt-3.5-turbo-1106",
  });

  const outputParser = new HttpResponseOutputParser();

  const chain = prompt.pipe(model).pipe(outputParser);
  try {
    // streamスタート
    const stream = await chain.stream({
      input: "Hi there!",
    });

    console.log("stream:::", stream);
  } catch (e) {
    console.log(e);
  }

  console.log(`
        ================================ [END] ================================
    `);
};

main();
