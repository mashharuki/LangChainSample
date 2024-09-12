import {ChatAnthropic} from "@langchain/anthropic";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import * as dotenv from "dotenv";

dotenv.config();

const {ANTHROPIC_API_KEY} = process.env;

/**
 * Anthropic社のモデルを使うプロンプトチェーンインスタンスを作成するメソッド
 * @param modelName モデル名
 * @param prompt テンプレートプロンプト
 */
export const createAnthropicPromptChain = async (
  modelName: string,
  prompt: ChatPromptTemplate
) => {
  const llm = new ChatAnthropic({
    apiKey: ANTHROPIC_API_KEY!,
    model: modelName,
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
  });

  // Chain your prompt and model together
  const chain = prompt.pipe(llm);
  return chain;
};
