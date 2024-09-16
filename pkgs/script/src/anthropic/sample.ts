import {createAnthropicPromptChain} from "../model";
import {ChatPromptTemplate} from "@langchain/core/prompts";

/**
 * メインスクリプト
 */
const main = async () => {
  // モデル名
  const modelName = "claude-3-haiku-20240307";

  // プロンプトのテンプレートを作成する。
  const prompt: ChatPromptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant that translates English to French. Translate the user sentence.",
    ],
    ["human", "I love programming."],
  ]);

  // プロンプトチェーン
  const chain = await createAnthropicPromptChain(modelName, prompt);

  // 実行
  const response = await chain.invoke({});

  console.log("reponse:::", response.content);
};

main();
