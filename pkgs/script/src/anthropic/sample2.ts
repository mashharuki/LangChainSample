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
      "You are a helpful assistant that translates {input_language} to {output_language}.",
    ],
    ["human", "{input}"],
  ]);

  // プロンプトチェーン
  const chain = await createAnthropicPromptChain(modelName, prompt);

  // 実行
  const response = await chain.invoke({
    input_language: "English",
    output_language: "German",
    input: "I love programming.",
  });

  console.log("reponse:::", response.content);
};

main();
