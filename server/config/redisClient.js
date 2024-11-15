const redis = require('redis');

const redisClient = redis.createClient();

(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
