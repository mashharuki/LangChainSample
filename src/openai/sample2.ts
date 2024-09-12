import {OpenAI} from "@langchain/openai";
import {PromptTemplate} from "@langchain/core/prompts";
import {StructuredOutputParser} from "langchain/output_parsers";
import * as dotenv from "dotenv";

dotenv.config();

const {OPENAI_API_KEY} = process.env;

/**
 * メインスクリプト
 */
const main = async () => {
  // プロンプトテンプレート
  const TEMPLATE = `
        あなたはTypeScriptに精通したエンジニアです。
        以下の質問に長くても5行以内で答えてjson形式で答えてください。

        質問: {question}
    `;

  const llmModel = new OpenAI({
    apiKey: OPENAI_API_KEY!,
    modelName: "gpt-4-1106-preview",
    modelKwargs: {response_format: {type: "json_object"}},
  });

  const prompt = new PromptTemplate({
    template: TEMPLATE,
    inputVariables: ["question"],
  });

  const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
    answer: "ユーザからの質問に対する回答",
  });

  // プロンプトチェーンを作成
  const chain = prompt.pipe(llmModel).pipe(outputParser);
  // 実行
  const result = await chain.invoke({
    question: "TypeScriptのジェネリクスはどのような場合に便利ですか？",
  });
  console.log("result:::", result.answer);
};

main();
