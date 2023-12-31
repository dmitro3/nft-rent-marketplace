const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { Mumbai } = require('@thirdweb-dev/chains');
const axios = require('axios');
const env = require('./config/env');


class NFTRentMarketplaceEventWorker {
  constructor() {
    this.contractAddress = env.nftRentMarketplaceContract;
    this.privateKey = env.walletPvKey;
    this.nftRentMarketplaceApi = env.nftRentMarketplaceApi;
    this.provider = env.mumbaiRpcUrl;
    this.init();
  }

  async init() {
    this.sdk = await ThirdwebSDK.fromPrivateKey(this.privateKey, { ...Mumbai, rpc: [this.provider] });
    this.contract = await this.sdk.getContract(this.contractAddress);
    this.contract.events.addEventListener('RentStarted', this.onRentStarted.bind(this));
    this.contract.events.addEventListener('PoolCreated', this.onPoolCreated.bind(this));
    this.contract.events.addEventListener('RentFinished', this.onRentFinished.bind(this));
    this.contract.events.addEventListener('ItemCreated', this.onItemCreated.bind(this));
    this.contract.events.addEventListener('ItemAddedToPool', this.onItemAddedToPool.bind(this));
  }

  async onRentStarted(event) {
    const payload = {
      rentId: Number(`${event.data.rentId._hex}`),
      poolId: Number(`${event.data.poolId._hex}`),
      rentee: event.data.rentee,
      owner: event.data.owner,
      nftId: Number(`${event.data.itemNftId._hex}`),
      price: Number(`${event.data.price._hex}`),
      expirationDate: new Date(Number(`${event.data.expirationDate._hex}`) * 1000),
      initDate: new Date(Number(`${event.data.initDate._hex}`) * 1000),
    }
    try {
      await axios.post(`${this.nftRentMarketplaceApi}/rents/start-rent`, payload);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async onRentFinished(event) {
    const payload = {
      rentId: Number(`${event.data.rentId._hex}`),
      finishDate: new Date(Number(`${event.data.finishDate._hex}`) * 1000),
    }
    try {
      await axios.post(`${this.nftRentMarketplaceApi}/rents/finish-rent`, payload);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async onPoolCreated(event) {
    try {
      const payload = {
        poolId: Number(`${event.data.poolId._hex}`),
        basePrice: Number(`${event.data.basePrice._hex}`),
      }
      await axios.post(`${this.nftRentMarketplaceApi}/pools/create-pool`, payload);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async onItemCreated(event) {
    try {
      const payload = {
        nftId: Number(`${event.data.nftId._hex}`),
        categoryId: Number(`${event.data.categoryId._hex}`),
        rentee: event.data.rentee,
        owner: event.data.owner,
      }
      await axios.post(`${this.nftRentMarketplaceApi}/items/create-item`, payload);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  async onItemAddedToPool(event) {
    try {
      console.log(event);
      const nftId = Number(`${event.data.nftId._hex}`)
      await axios.post(`${this.nftRentMarketplaceApi}/items/add-to-pool/${nftId}`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}


module.exports = { NFTRentMarketplaceEventWorker };
