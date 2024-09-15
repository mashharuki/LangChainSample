# Overview

Magicblock is a framework for on-chain games on Solana/SVM. We believe in open-source, in making no compromise between composability/UX and we are deeply committed to bringing on-chain games into the mainstream.

This Github hosts all our open-source experiments and production-ready tools.

Website: https://www.magicblock.gg
Discord: https://discord.gg/yKvddrZ25u
Twitter: https://twitter.com/magicblock

## Projects we support:

Below is a series of assets that we are developing and maintaining, available in open-source for the gaming community:

- Solana.Unity Core: Solana's .NET 2.0 SDK integration library for Unity.
- Solana.Unity SDK: Open-Source Solana SDK for Unity.
- Solana.Unity Metaplex: Open-Source Metaplex SDK for Unity.
- Solana.Unity Anchor: Unity C# Client code generation tools for Solana Anchor programs.

## Introduction

The high-performance engine for onchain games and applications on Solana

MagicBlock is a network on top of Solana for building a new type of games and consumer applications that are open, decentralized and unstoppable. MagicBlock accelerates and extends Solana’s capabilities while preserving composability.

Why MagicBlock Engine?
MagicBlock introduces a new primitive to accelerate and scale Solana without state fragmentation. Ephemeral Rollups are Just-In-Time, SVM-based runtimes that accelerate state transitions for selected Solana Accounts. Developers can delegate any account from existing Solana smart contracts into the MagicBlock Engine to access faster performances, customizable runtimes and/or dedicated blockspace.

​
What can I build with MagicBlock?
MagicBlock Engine facilitates the creation of any game and consumer application that aims to be trustless, decentralized and unstoppable.

Games that are persistent and can’t be stopped, because they don’t rely on any server or centralized infrastructure (they run entirely on the blockchain)
Games that are permissionlessly composable. Because all the game data and logic is open, everyone can extend your game with new content, new logic, or interoperate across games without limits.
Autonomous Worlds or any application that leverages decentralization to provide an always-on, global and unstoppable experience.
​
Where do I start?
You can start building the logic of your game/app with the BOLT framework. If you want to accelerate or scale existing smart contracts operations, check out the Ephemeral Rollups section.

Unstoppable games and applications
Why building fully onchain matters

Unstoppable Games or fully onchain games are games whose state and logic run entirely on a blockchain. There are several reasons why building entirely onchain can be advantageous.

Permissionless Composability - Onchain games lower the barrier for User-Generated Content (UGC) and User-Generated Logic (UGL). It’s very easy for creators to receive royalties or microtransactions for the content they add to a game. When it comes to game logic, anyone can transparently and permissionlessly extend it and alter some of the game mechanics, leading to the emergence of new behaviours that the original developer may not have foreseen. Users become an active demiurge of that world - they are not only playing the game but actively shaping it.

Trustless Compute - Blockchains are trustless computing platforms. They rely on decentralized consensus mechanisms and cryptographic principles to ensure the integrity and accuracy of data and transactions. This trustless nature enhances security and transparency, making it ideal for stake-based matches, wagers and prediction markets while eliminating all the risk associated with centralized parties.

Persistency - games don’t need a server. The blockchain is the “backend” and any application running on it inherits its persistency and censorship-resistance properties. This enables the creation of digital experiences that can run forever.

Crypto-primitives - onchain games are natively plugged in a rich system of protocols and dapps that developers can permissionlessly access to enrich the player’s experience or to enhance distribution. Defi for in-game economies, identity primitives, global payments, market-driven governance systems (e.g. Futarchy) are only a few examples of what can be leveraged out of the box.

Ultimately, we believe onchain games will unlock a new chapter of play, allowing players and game developers to collaborate in the creation of infinitely extendible and customizable digital experiences.

## Sessions

Introduction
What are Session Keys?

Session Keys are ephemeral keys with fine-grained instruction scoping for tiered access in your Solana Programs.

Session keys are a giant leap for improving UX for users as they take away the need for repeated wallet popups while a user performs actions in-game like purchases or on-chain interactions. The expiry and access are stored at the contract level which immunes session keys from potential security vulnerabilities. The Session Keys parameters can be duration, the maximum amount of tokens spent, amount of transactions or any other function specific to your use case.

You can also provide a layered security model which allows tiered access to a session key making sure a user’s assets are always secure and can’t be accessed by the session keys. This type of layered security is a standard model in web2 applications and provides a stronger defence against attacks and helps ensure the security of your users’ asset. This is now possible in web3 with the use of Session Keys at the contract level.

​
Example use cases for Session Keys
An uninterrupted gaming experience for an on-chain game.
A seamless experience for in-app NFTs purchase
A layered security model for your game/dApp

Program
The original Session key program was developed by Gum. The newly deployed program is ‘KeyspM2ssCJbqUhQ4k7sveSiY4WjnYsrXkC8oDbwde5’

How do Session Keys work?
What are Session Keys?

Session Keys are meant to be used as secondary signers in your program, especially for frequent interactions like liking a post or moving a piece in a game of chess where constant popups can get in the way of smooth user experience. They are not burner wallets.

Session Keys work in tandem with our on chain program to validate the token and it’s scope.

​
Session Keys have two components
An Ephemeral Keypair, intended to be used as a secondary signer in the target program.
A Session Token, a PDA containing information about expiry and scope of the keypair.
​
Ephemeral Keys are stored on the client side, to invoke transactions.
The transactions invoked by these ephemeral keys are validated in the target program for their validity, expiry and scope.
Every transaction needs to present both the ephemeral signer and the session token
This is the general idea behind account abstraction, where instead of just an externally owned key there is also smart contract that enhances security.

Security
Key management and security model

​
Key Management
Key Management is an extremely important aspect of the security. One thing to note here however is that how securely one can manage the keys is platform dependent, for example a mobile app with access to local keystore/keychain is a lot more secure compared to a web browser.

Our current client side key management is only on the web. Given the constraints, we do take adequate security measures on the browser.

The ephemeral keypair is encrypted and safely stored in the user’s browser using IndexedDB, an in-browser database. When a user initiates an action, such as signing and sending a transaction, the session token signs the transaction using the temporary key pair. The smart contract can then validate the transaction, confirming that the user’s wallet authorized the session token.\

Generate a random keypair using web3.Keypair.generate()
Generate a random encryption key
Using the encryption key encrypt the generated keypair.
Store the encrypted key in IndexedDB
​
Security Model

1. The session keys are like your JWT Token adapted to web3

2. These keys have an expiry and a scope

3. Once the key has expired they can’t be reused in the target program. A new session token is to be generated.

4. They are also designed to be revokable, so that in the worst case if something wrong happens the attack surface is limited to the ephemeral keypair and the assets contained in them. i.e 0.01 SOL

​
Note on IndexedDB
Web Browser is an extremely adverserial environment, no amount of security is enough there, right from cookies to session to extension’s sandbox.

Attackers could always inject arbitrary code via XSS or malicious extension. This is why users are discouraged from storing serious funds in a browser wallet, they are only for day to day expenses and it is really important to establish the distinction that Session Keys are not burner wallets.

However, majority of web3 today is on web browsers and that’s how users primarily interact with other dApps. Given the constraints of today, we have to design around them and harden them via other means.

Drastically reduce the scope of what’s possible with an ephemeral signer, they are highly context and use case specific.
This is similar to the approach to JWT in a typical client server architecture in web2.
For example the session or JWT tokens on Facebook, twitter or even banking website could be vulnerable to the same issue. The way they address is this by limiting the scope of what you can do with a token, have intelligent systems in place to revoke them and further introduce 2FA for suspicious activity.
We follow a similar model to limit the scope, we are also working on adding intelligent revocation systems which can revoke a compromised token as soon as we witness a malicious transaction like out of scope usage etc. The absolute worst case scenario in terms of loss of funds is the 0.01 SOL topped up to pay for the gas fee.
Also**, developers can work around this today by pairing it with a gasless relay like octane and setting topUp to false**. However, we don’t have a seamless way to do it directly from our SDK yet, although it is on our roadmap.

Integrating Sessions in your Program
Integrate and manage sessions in your Solana Programs

This is a guide on how you can integrate Session Keys into your Solana Anchor programs.

​
Installation

````sh
cargo add session-keys --features no-entrypoint
``​`

Usage
Import the dependencies.


```rs
    use session_keys::{SessionError, SessionToken, session_auth_or, Session};
````

Derive the Session trait on your instruction struct.

```rs
#[derive(Accounts, Session)]
pub struct Instruction<'info> {
.....
pub user: Account<'info, User>,

    #[session(
        // The ephemeral keypair signing the transaction
        signer = signer,
        // The authority of the user account which must have created the session
        authority = user.authority.key()
    )]
    // Session Tokens are passed as optional accounts
    pub session_token: Option<Account<'info, SessionToken>>,

    #[account(mut)]
    pub signer: Signer<'info>,
    .....

}
```

Add the session_auth_or macro to your instruction handler with fallback logic on who the instruction should validate the signer when sessions are not present and an appropriate ErrorCode.

If you’ve used require\*! macros in anchor_lang, you already know how this works.

```rs
#[session_auth_or(
ctx.accounts.user.authority.key() == ctx.accounts.authority.key(),
ErrorCode
)]
pub fn ix_handler(ctx: Context<Instruction>,) -> Result<()> {
.....
}
```

Installation
Step-by-step guide on setting up and integrating the session wallet management system into your dApp

Session Keys are a part of the Gum React-SDK, so you need to install the package using either yarn or npm:

```bash
yarn add @magicblock-labs/gum-react-sdk
```

With the package installed, you can now begin integrating the session wallet management system into your dApp for enhanced security and user experience.

Usage Example
Learn how to interact with your dApp using the useSessionKeyManager and SessionWalletProvider through various practical examples

Now that you have set up the hooks and provider, let’s look at some examples of using the provided methods.

​
Creating a Session
To create a session, call the createSession method from the sessionWallet. This method accepts three parameters:

targetProgramPublicKey: A PublicKey instance representing the target program you want to interact with.
topUp: A boolean value, set to true if you want to top up an session keypair with 0.001 SOL initially and `false` if you dont want to topUp the session Keypair.
expiryInMinutes: An optional parameter, representing the session’s expiry time in minutes. The default value is 60 minutes.

```ts
const handleCreateSession = async () => {
  const targetProgramPublicKey = new PublicKey(
    "your_target_program_public_key"
  );
  const topUp = true;
  const expiryInMinutes = 60;

  const session = await sessionWallet.createSession(
    targetProgramPublicKey,
    topUp,
    expiryInMinutes
  );

  if (session) {
    console.log("Session created:", session);
  } else {
    console.error("Failed to create session");
  }
};
```

By calling createSession, a new ephemeral keypair is generated and stored on the client-side. The session token is then created and stored alongside the keypair. This enables the user to securely sign transactions using the generated keypair without revealing their actual wallet’s private key.

​
Signing and Sending a Transaction
To sign and send a transaction, use the signAndSendTransaction method. This method first signs the transaction using the ephemeral key pair created during the session. Then, it sends the signed transaction to the Solana network.

```ts
const handleSendTransaction = async () => {
  const transaction = new Transaction();
  // Add instructions to the transaction
  const txids = await sessionWallet.signAndSendTransaction(transaction);

  if (txids && txids.length > 0) {
    console.log("Transaction sent:", txids);
  } else {
    console.error("Failed to send transaction");
  }
};
```

The signAndSendTransaction method provides an extra layer of security by ensuring that the actual wallet’s private key is not exposed. The ephemeral key pair stored on the client-side is used to sign the transaction, thus keeping the user’s main wallet secure.

​
Revoking a Session
To revoke a session, call the revokeSession method from the sessionWallet. This method performs two actions:

It removes the ephemeral key pair and the session token from the client-side storage.
It revokes the session from the contract.

```ts
const handleRevokeSession = async () => {
  await sessionWallet.revokeSession();
  console.log("Session revoked");
};
```

Revoking a session ensures that the ephemeral key pair is no longer valid and usable.

These examples should help you get started with implementing session management and wallet functionality in your app.

Please refer to the “Create Post” section in the Example App to see how the Session Token implementation is done.

Use session key manager
A custom React hook that manages the creation and revocation of session tokens, and provides essential methods for signing and sending transactions in a secure and user-friendly way

useSessionKeyManager is a custom hook that takes an AnchorWallet, Connection, and Cluster as arguments and returns a SessionWalletInterface. This hook manages the session keys, tokens, and provides methods for signing and sending transactions.

The SessionWalletInterface consists of the following properties and methods:

```ts
interface SessionWalletInterface {
  publicKey: PublicKey | null; // Public key associated with the session wallet
  isLoading: boolean; // Indicates whether the session wallet is loading
  error: string | null; // An error message, if any
  sessionToken: string | null; // Session token for the current session
  signTransaction:
    | (<T extends Transaction>(transaction: T) => Promise<T>)
    | undefined; // Sign a single transaction
  signAllTransactions:
    | (<T extends Transaction>(transactions: T[]) => Promise<T[]>)
    | undefined; // Sign multiple transactions
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined; // Sign a message
  sendTransaction:
    | (<T extends Transaction>(transaction: T) => Promise<string>)
    | undefined; // Send a signed transaction
  signAndSendTransaction:
    | (<T extends Transaction>(transactions: T | T[]) => Promise<string[]>)
    | undefined; // Sign and send transactions
  createSession: (
    targetProgram: PublicKey,
    topUp: boolean,
    validUntil?: number
  ) => Promise<{ sessionToken: string; publicKey: string } | undefined>; // Create a new session
  revokeSession: () => Promise<void>; // Revoke the current session
  getSessionToken: () => Promise<string | null>; // Retrieve the current session token
}
```

```ts
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useSessionKeyManager } from '@gumhq/react-sdk';

function YourComponent() {
  const wallet = useAnchorWallet();
  const connection = useConnection();
  const cluster = "devnet"; // or "mainnet-beta", "testnet", "localnet"

  const sessionWallet = useSessionKeyManager(wallet, connection, cluster);

  // Access session wallet properties and methods here
  // Example: sessionWallet.publicKey
  // Example: sessionWallet.createSession

  return (
    // Your component JSX
  );
}

```

## SOAR

Solana On-Chain Achievement & Ranking

SOAR is a program that provides a seamless solution for managing leaderboards, achievements, players’ profiles and automatic rewards distribution on the Solana blockchain. Currently supporting invocation from a TypeScript client, the integration in Solana.Unity-SDK will be coming soon.

Quick start
​
Create a new game

```Ts
import { SoarProgram, GameType, Genre } from "@magicblock-labs/soar-sdk";

// Create a Soar client using the '@solana/web3.js' active Connection and a defaultPayer
const client = SoarProgram.getFromConnection(connection, defaultPayer);

let game = Keypair.generate();
let title = "Game1";
let description = "Description";
let genre = Genre.Action;
let gameType = GameType.Web;
let nftMeta = Keypair.generate().publicKey;
let _auths = auths.map((keypair) => keypair.publicKey);

// Retrieve the bundled transaction.
let { newGame, transaction } = await client.initializeNewGame(
  game.publicKey,
  title,
  description,
  genre,
  gameType,
  nftMeta,
  _auths
);
// Send and confirm the transaction with the game keypair as signer.
await web3.sendAndConfirmTransaction(connection, transaction);

```

Create a leaderboard

```ts
const transactionIx = await client.addNewGameLeaderBoard(
  newGame,
  authWallet.publicKey,
  "my leaderboard", // description
  leaderboardNft, // nft associated with the leaderboard
  100,
  true // isAscending
);

await web3.sendAndConfirmTransaction(connection, transactionIx.transaction, [
  authWallet,
]);
```

Submit a score

```ts
const score = 10;
const playerAddress = new web3.PublicKey("..."); // The player publicKey
const authWallet = web3.Keypair.fromSecretKey(bs58.decode("")); // AUTH_WALLET_PRIVATE_KEY
const leaderboardPda = new web3.PublicKey(""); // LEADERBOARD_PDA

const transactionIx = await client.submitScoreToLeaderBoard(
  playerAddress,
  authWallet.publicKey,
  leaderboardPda,
  new BN(score)
);

await web3.sendAndConfirmTransaction(connection, transactionIx.transaction, [
  authWallet,
]);
```

## tutorial repo

https://github.com/magicblock-labs/solana-generals

Abstract
In order to get a full birds eye view of all moving pieces involved with using MagicBlock, we provide a real-life example of a fully-fledged game accelerated by the MagicBlock Engine.

You can access and download the code from the github repository: HERE

​
Architechture
There are a few main components involved when building with MagicBlock:

Solana, this will be mainnet-beta or devnet solana public chain’s RPC

This is where the smart contracts will be deployed and fetched from
This is where the final and partial state of your game will be settled on
Ephemeral Rollups, this is the MagicBlock validator RPC

This is where the transactions for your game will be run on
This is already deployed by MagicBlock and node operators (you can just use it as-is)
The Backend, this is the source code for the smart contract of the game

In this example the smart contracts are written using the BOLT framework
Those smart contracts will then be deployed on the regular solana’s chain
Source code is available: HERE
The Frontend, this is the User Interface of the game

The UI will be fetching state from both the chain and the ephemeral
The UI will be sending transaction to both the chain and the ephemeral
Source code is available: HERE
​
Important processes
Browsing through the codebase will help understanding the high-level logic for setting up the ephemeral games.

​
When the user creates a new game
When the user opens the “Create” page, we run create a new game: HERE

We first create a new account on chain, like a regular solana smart contract
We then delegate this new account to our ephemeral validator
We can then send all our game transactions directly to the ephemeral’s RPC after that
We generate the map (using a transaction sent to the ephemeral’s RPC)
Wait for the players to join
Start the game when all player joined
​
When a player joins the game
When the user opens the main page, we fetch the list of existing games from the chain: HERE

When the user joined the game’s page, we start listening to the game’s state inside the ephemeral: HERE
We update the UI to display the map every time the game changes inside of the ephemeral, you can find the code for the page logic: HERE
When the user executes a move on the map, we send the command transaction through directly in the ephemeral: HERE
This will update the state of the game inside of the ephemeral, notifying all players and updating the UI immediately
​
Recap
Making a game using MagicBlock is very similar to making a game on Solana.

The only difference is the delegation process:

Once you setup the accounts on Solana, you can delegate the accounts so that they can be used inside of MagicBlock Engine
Once the accounts are delegated, you can send all transactions involving those accounts to the Ephemeral Rollups
Those transactions running inside of the Ephemeral session run in real time and can be free
Once you’re done with the game’s session, you can undelegate the accounts you need to use on Solana again

## BOLT Framework

Building your game logic onchain

Game state & logic
To build a game onchain, you’ll need to familiarize with Solana programs (smart contracts). You might be already familiar with Anchor, one of the most used toolkit for writing smart contract on Solana.

BOLT is a framework that extends Anchor functionalities to include a standardized way to model your game’s logic using an Entity Components Systems (ECS) pattern.

The ECS is a modular pattern that decouples logic from state and facilitates code reusability, extensibility and performance improvement for large-scale projects. The Solana Virtual Machine (SVM) also makes use of a paradigm similar to an ECS given that state (accounts) and the logic (programs) are natively separated.

In the Entity Component System:

Entities are general-purpose object represented by a unique identifier. They don’t contain any data or behaviour but serves as an identifier for a bundle of components.
Components are raw data structures. For instance, a Position Component might contain some x, y, and z coordinates. This is concept is essentially equivalent to accounts on Solana.
Systems perform the game logic by acting upon entities that have specific components. Systems are essentialy programs on Solana, which only specify the logic and the accounts they operate on.
While BOLT supports all the functionalities of Anchor, adopting the ECS pattern is helpful if you want to reuse existing components/system or enable simpler mods and extension for your game.

Mapping and State listening
Integrating BOLT with different clients

The standardized ECS pattern allows for easy integration of game components with a rendering engine to display the game interface. Bolt can be viewed as an open and permissionless alternative to a backend intended as a multiplayer game server.

For visualization and rendering, existing engines such as Unity, Unreal Engine, Phaser, and others can be used.

The standardized structure of the components allows for automatic mapping of components and entity properties (abstracting serialization and deserialization. State updates can be easily performed and intercepted, providing a mechanism similar to the Observer pattern to listen to state changes and update the rendering.

If you are building with Unity, the Solana Unity SDK gives you all the necessary tools to connect the gaming interface with Bolt.
