This is the back end servcie to manage arbitrage opportunities between descentralized exchanges.

## Descentralized Exchanges

This bot would only work with Descnetralized Exchanges that have been forked from [Uniswap V2](https://docs.uniswap.org/) to ensure that they share the basic features. You could find a list of all the available DeEx in [DeFiLama](https://defillama.com/forks/Uniswap%20V2).

### Potentical DeExchanges

1. [Uniswap V2](https://docs.uniswap.org/)
2. [PancakeSwap](https://docs.pancakeswap.finance/)
3. [SushiSwap](https://www.sushi.com/)

## Data and Basic Operations

#### Token

**This is the basic data that needs to be introduced.** We just need the ethereum token address and then all data is filled by the service. Once a token is created you can get/update/delete as any other resource.

#### Pair

This data requires to have previously created some tokens as this is the relation between 2 tokens. We need the MongoIDs of 2 tokens. The reference to token0 and token1 could be deifferent when the request is processed as it will define the data as it is returned from the Pair Smart Contract.

#### Potential Tokens

- Tether USD (USDT) - `0xdac17f958d2ee523a2206206994597c13d831ec7`
- Wrapped Ether (WETH) - `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`
- USD Coin (USDC) - `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`
- SHIBA INU (SHIB) - `0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce`
- chiliZ (CHZ) - `0x3506424f91fd33084466f402d5d97f05f8e3b4af`
- BNB (BNB) - `0xB8c77482e45F1F44dE1745F52C74426C631bDD52`
- USDC (USDC) - `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`
- stETH (stETH) - `0xae7ab96520de3a18e5e111b5eaab095312d7fe84`
- Wrapped TON Coin (TONCOIN) - `0x582d872a1b094fc48f5de31d3b73f2d9be47def1`
- TRON (TRX) - `0x50327c6c5a14dcade707abad2e27eb517df87ab5`
- ChainLink Token (LINK) - `0x514910771af9ca656af840dff83e8264ecf986ca`
- Matic Token(MATIC) - `0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0`
- Wrapped BTC (WBTC) - `0x2260fac5e5542a773aa44fbcfedf7c193bc2c599`
- Theta Token (THETA) - `0x3883f5e181fccaf8410fa61e12b59bad963fb645`

### Todo's

- Add Husky
- Add MongoDB Url into .env
- Add Swagger docs
- Ensure all addresses stored are in lower case, ensure all address comparasions convert address to lower case
- There is the following error when a pair is added (probably th eissue is in the response schema validation):
  ```
  {
    "statusCode": 500,
    "error": "Internal Server Error",
    "message": "\"_id\" is required!"
  }
  ```

### Code Inspiration

- [Build, Test & Deploy an Application](https://www.youtube.com/watch?v=8u3zQkLz9gQ&t=3712s)
- [Dapp University - Arbitrage with Flash Loans](https://www.youtube.com/watch?v=-OdefEgdu-I)
