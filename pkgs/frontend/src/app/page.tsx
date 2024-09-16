"use client";

import axios from "axios";

/**
 * Home Component
 * @returns
 */
export default function Home() {
  /**
   * getUserData method
   */
  const getUserData = async () => {
    try {
      const response = await axios.get("/api/user");
      console.log("response", response);
      console.log("response.data", response.data);
      console.log("Name: ", response.data.name);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axiosのエラーが発生しました:", error);
      } else {
        console.error("Axios以外のエラーが発生しました:", error);
      }
    }
  };

  /**
   * generate NFT Data method
   */
  const generateNftData = async () => {
    try {
      // NFTのメタデータを生成するAPIを呼びだす。
      const response = await axios.post("/api/ai");
      console.log("response", response);
      console.log("response.data", response.data);
      console.log("Name: ", response.data.name);

      // NFTの画像データを自動生成するAPIを呼び出す。
      const response2 = await axios.post("/api/ai/generateImage");
      console.log("response2", response2);
      console.log("response2.data", response2.data);
      console.log("imageUrl: ", response2.data.imageUrl);

      // 問題と回答を自動生成するAPIを呼び出す。
      const response3 = await axios.post("/api/ai/generateQuiz");
      console.log("response3", response3);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axiosのエラーが発生しました:", error);
      } else {
        console.error("Axios以外のエラーが発生しました:", error);
      }
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={async () => {
              await getUserData();
            }}
          >
            Call Sample API
          </button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={async () => {
              await generateNftData();
            }}
          >
            Generate NFT Data
          </button>
        </div>
      </main>
    </div>
  );
}
