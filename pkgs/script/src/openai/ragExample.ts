import {ChatOpenAI, OpenAIEmbeddings} from "@langchain/openai";
import {HNSWLib} from "@langchain/community/vectorstores/hnswlib";
import {Document} from "@langchain/core/documents";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {
  RunnableLambda,
  RunnableMap,
  RunnablePassthrough,
} from "@langchain/core/runnables";
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

  // ベクトルデータストア
  const vectorStore = await HNSWLib.fromDocuments(
    [
      new Document({pageContent: "Harrison worked at Kensho"}),
      new Document({pageContent: "Bears like to eat honey."}),
    ],
    new OpenAIEmbeddings()
  );
  const retriever = vectorStore.asRetriever(1);
  // テンプレートプロンプト
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "ai",
      `Answer the question based on only the following context:
        
      {context}`,
    ],
    ["human", "{question}"],
  ]);
  // モデルを指定
  const model = new ChatOpenAI({
    apiKey: OPENAI_API_KEY!,
  });
  const outputParser = new StringOutputParser();

  const setupAndRetrieval = RunnableMap.from({
    context: new RunnableLambda({
      func: (input: string) =>
        retriever.invoke(input).then((response) => response[0].pageContent),
    }).withConfig({runName: "contextRetriever"}),
    question: new RunnablePassthrough(),
  });

  try {
    // プロンプトチェーンを作成
    const chain = setupAndRetrieval.pipe(prompt).pipe(model).pipe(outputParser);
    // プロンプトを実行
    const response = await chain.invoke("Where did Harrison work?");
    console.log(response);
  } catch (e: any) {
    console.error("error: ", e);
  }

  console.log(`
        ================================ [END] ================================
    `);
};

main();
