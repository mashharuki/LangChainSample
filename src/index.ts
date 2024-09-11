import {ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";
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

  // プロンプト
  const prompt = ChatPromptTemplate.fromMessages([
    ["human", "Tell me a short joke about {topic}"],
  ]);
  // モデル指定
  const model = new ChatOpenAI({
    apiKey: OPENAI_API_KEY!,
  });

  const outputParser = new StringOutputParser();
  // プロンプトチェーンを作成
  const chain = prompt.pipe(model).pipe(outputParser);
  // 実行
  const response = await chain.invoke({
    topic: "ice cream",
  });

  console.log("reponse:::", response);

  console.log(`
        ================================ [END] ================================
    `);
};

main();
