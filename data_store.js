import { createClient } from 'redis';


const DataStore = (function () {
  var redisClient;

  async function createRedisClient() {
    const client = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
    
    return client;
  }
  
  function normalizedValue(value) {
    return typeof value === "object" ? JSON.stringify(value) : value;
  }

  return {
    put: async function (key, value) {
      if (!redisClient) {
        redisClient = await createRedisClient();
      }

      await redisClient.set(key, normalizedValue(value));
    }
  };
})();

export default DataStore;
