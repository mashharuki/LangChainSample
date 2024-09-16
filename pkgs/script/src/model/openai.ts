import {ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";
import * as dotenv from "dotenv";

dotenv.config();

const {OPENAI_API_KEY} = process.env;

/**
 * OpenAIのモデルを使うプロンプトチェーンインスタンスを作成するメソッド
 * @param prompt テンプレートプロンプト
 */
export const createOpenAiPromptChain = async (prompt: ChatPromptTemplate) => {
  // モデル指定
  const model = new ChatOpenAI({
    apiKey: OPENAI_API_KEY!,
  });

  const outputParser = new StringOutputParser();
  // プロンプトチェーンを作成
  const chain = prompt.pipe(model).pipe(outputParser);

  return chain;
};
