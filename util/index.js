const { randomBytes } = require('crypto');
const { promisify } = require('util');

const randomBytesAsync = promisify(randomBytes);

module.exports = {
  getResetToken: async () => {
    const buffer = await randomBytesAsync(32);
    return buffer.toString('hex');
  }
}