import {ChatPromptTemplate} from "@langchain/core/prompts";
import {createOpenAiPromptChain} from "./model";

/**
 * mainスクリプト
 */
const main = async () => {
  console.log(`
        ================================ [START] ================================
    `);

  // プロンプトのテンプレートを作成する。
  const prompt: ChatPromptTemplate = ChatPromptTemplate.fromMessages([
    ["human", "Tell me a short joke about {topic}"],
  ]);

  // プロンプトチェーンを作成
  const chain = await createOpenAiPromptChain(prompt);

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
