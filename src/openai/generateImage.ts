import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const {OPENAI_API_KEY} = process.env;

const OPENAI_API_URL = "https://api.openai.com/v1/images/generations";

/**
 * mainスクリプト
 */
const main = async () => {
  console.log(`
        ================================ [START] ================================
    `);

  // prompt
  const prompt = `
    Please generate monster image.
    At that time, please follow these conditions.

    - Pixel art style
    - A monster that looks like it could appear in Super Mario or Dragon QuestHas or Pokemom
    - wings on its back
    - A posture that gives off an intimidating presence
    - A design reminiscent of old-school games
    - Please make the background transparent.
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        prompt, // 生成する画像のプロンプトを指定
        n: 1, // 生成する画像の数
        size: "1024x1024", // 画像サイズ
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 生成された画像のURLを取得
    const imageUrl = response.data.data[0].url;
    console.log("Generated image URL:", imageUrl);
  } catch (error: any) {
    console.error(
      "Error generating image:",
      error.response ? error.response.data : error.message
    );
  } finally {
    console.log(`
        ================================ [END] ================================
    `);
  }
};

main();
