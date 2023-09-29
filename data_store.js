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

  function denormalizedValue(value) {
    return JSON.parse(value);
  }

  return {
    put: async function(key, value) {
      if (!redisClient) {
        redisClient = await createRedisClient();
      }

      await redisClient.set(key, normalizedValue(value));
    },

    get: async function(key) {
      if (!redisClient) {
        redisClient = await createRedisClient();
      }

      const value = await redisClient.get(key);
      return denormalizedValue(value);
    }
  };
})();

export default DataStore;
