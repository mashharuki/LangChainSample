"use server";

import {NextResponse} from "next/server";
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
import * as fs from "fs/promises";
import path from "path";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY!;

/**
 * Markdownファイルを読み込んでstring型に変換する関数
 * @param filePath
 * @returns
 */
async function readMarkdownFile(filePath: string): Promise<string> {
  try {
    // ファイルの内容を読み込む (Bufferとして取得)
    const fileContent = await fs.readFile(filePath, "utf-8");

    // 文字列として返す
    return fileContent;
  } catch (error) {
    console.error("Error reading the file:", error);
    throw error; // エラーが発生した場合はエラーを投げる
  }
}

/**
 * OpenAIのAPIを呼び出す
 * @returns
 */
export async function POST() {
  try {
    // マークダウンの内容を読み込む
    const content = await readMarkdownFile(
      path.join("./src/data", "MagicBlock.md")
    );
    // console.log("content:::", content);
    // ベクトルデータストア
    const vectorStore = await HNSWLib.fromDocuments(
      [new Document({pageContent: content})],
      new OpenAIEmbeddings({
        openAIApiKey: OPENAI_API_KEY,
      })
    );
    const retriever = vectorStore.asRetriever(1);
    // テンプレートプロンプト
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "ai",
        `Please create simple question based on only the following context:
        
        {context}`,
      ],
      ["human", "{question}"],
    ]);

    // モデルを指定
    const model = new ChatOpenAI({
      apiKey: OPENAI_API_KEY,
    });
    const outputParser = new StringOutputParser();

    const setupAndRetrieval = RunnableMap.from({
      context: new RunnableLambda({
        func: (input: string) =>
          retriever.invoke(input).then((response) => response[0].pageContent),
      }).withConfig({runName: "contextRetriever"}),
      question: new RunnablePassthrough(),
    });

    // プロンプトチェーンを作成
    const chain = setupAndRetrieval.pipe(prompt).pipe(model).pipe(outputParser);
    // プロンプトを実行
    const response = await chain.invoke(`
        MagicBookについて簡単なクイズを作成してください。
        
        その際、回答は4択して正しい答えが1つだけになるようにしてください。
        問題と回答は1ペアだけ作成してください。
        問題文に答えが含まれないように注意してください。

        問題と回答はJSON形式で出力してください。
    `);

    console.log("reponse:::", response);

    return NextResponse.json({});
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
}
