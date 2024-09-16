# LangChainSample

TypeScript で実装する LangChain 練習用のリポジトリです

## How to work

- **setup**

  create `.env` file

  ```txt
  OPENAI_API_KEY=""
  ANTHROPIC_API_KEY=""
  ```

- **install**

  ```bash
  yarn
  ```

- **run scripts**

  - **Sample Call LLM**

    ```bash
    yarn script start
    ```

  - **generate NFT Metadata**

    ```bash
    yarn script sample
    ```

  - **RAG Example**

    ```bash
    yarn script ragExample
    ```

  - **generate quiz about magicBlock**

    ```bash
    yarn scripts magicBookRag
    ```

  - **generate monster Image**

    ```bash
    yarn script generateImage
    ```

  - **Anthropic Sample**

    ```bash
    yarn script anthropic:sample
    ```

  - **Anthropic Sample2**

    ```bash
    yarn script anthropic:sample2
    ```

### 参考文献

1. [Langchain - getstarted](https://js.langchain.com/v0.1/docs/expression_language/get_started/)
2. [LangChain やるなら Python より TypeScript の方がいんじゃね？](https://zenn.dev/optimisuke/articles/d6dcb852e14c81)
3. [GitHub - LangChain Sample](https://gist.github.com/YukiTominaga/a6cdd83dacf9187dd7e43b010f1d2709)
