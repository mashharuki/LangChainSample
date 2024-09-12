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
    yarn start
    ```

  - **RAG Example**

    ```bash
    yarn ragExample
    ```

  - **Anthropic Sample**

    ```bash
    yarn anthropic:sample
    ```

  - **Anthropic Sample2**

    ```bash
    yarn anthropic:sample2
    ```

### 参考文献

1. [Langchain - getstarted](https://js.langchain.com/v0.1/docs/expression_language/get_started/)
2. [LangChain やるなら Python より TypeScript の方がいんじゃね？](https://zenn.dev/optimisuke/articles/d6dcb852e14c81)
