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
        あなたはWeb3とNFTに精通したエンジニアです。
        RPG系のゲームに出てくるモンスターNFTに割り当てるメタデータを生成してjson形式で答えてください。

        なお、次の要素を含んだメタデータとしてください。
          1. name
          2. description
          3. attributes

        attributesには次の要素を含めてください。
          1. Health
          2. attack
          3. defense
          4. rarity

        attributesの中身は、 

          "Health": 1000,
        
        のような形式で出力してください。
    `;

  const llmModel = new OpenAI({
    apiKey: OPENAI_API_KEY!,
    modelName: "gpt-4-1106-preview",
    modelKwargs: {response_format: {type: "json_object"}},
  });

  const prompt = new PromptTemplate({
    template: TEMPLATE,
    inputVariables: [],
  });

  /*
  const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
    name: "name",
    description: "description",
    attributes: {
      health: "Health of the monster",
      attack: "Attack power of the monster",
      defense: "Defense power of the monster",
      rarity: "Rarity of the monster",
    },
  });
  */

  // プロンプトチェーンを作成
  const chain = prompt.pipe(llmModel);
  try {
    // 実行
    const result = await chain.invoke({});
    console.log("result:::", result);

    // JSONオブジェクト化
    const metadata = JSON.parse(result);
    console.log("name::: ", metadata.name);
  } catch (e: any) {
    console.error("error:", e);
  }
};

main();
