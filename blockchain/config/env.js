require("dotenv").config()

module.exports = {
  walletPvKey: process.env.WALLET_PV_KEY ?? "",
  walletAddress: process.env.WALLET_ADDRESS ?? "",
  mumbaiRpcUrl: process.env.MUMBAI_RPC_URL ?? "",
  nftContractAddress: process.env.NFT_CONTRACT ?? "",
  nftRentMarketplaceContract: process.env.NFT_RENT_MARKETPLACE_CONTRACT ?? "",
  dataFeedContractAddress: process.env.PRICE_FEED_MATIC_USD ?? "",
  vrfKeyHash: process.env.VRF_KEY_HASH ?? "",
  vrfCoordinatorContractAddress: process.env.VRF_COORDINATOR_CONTRACT ?? "",
  vrfSubId: Number(process.env.VRF_SUB_ID) ?? 0,
  cfSubId: Number(process.env.CF_SUB_ID) ?? 0,
  cfOracleAddress: process.env.CF_ORACLE_ADDRESS ?? "",
  sxtPvKey: process.env.SXT_PV_KEY ?? "",
  sxtURL: process.env.SXT_URL ?? "",
  sxtPubKey: process.env.SXT_PUB_KEY ?? "",
  sxtUserId: process.env.SXT_USER_ID ?? "",
  sxtCLIPath: process.env.SXT_CLI_PATH ?? "",
  sxtOrgCode: process.env.SXT_ORG_CODE ?? "",
  biscuitItems: process.env.BISCUIT_ITEMS ?? "",
  biscuitRents: process.env.BISCUIT_RENTS ?? "",
  biscuitPools: process.env.BISCUIT_POOLS ?? ""
}
