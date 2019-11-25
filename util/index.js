const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { unlink } = require('fs');
const { join } = require('path');

const randomBytesAsync = promisify(randomBytes);
const unlinkAsync = promisify(unlink);

module.exports = {
  getResetToken: async () => {
    const buffer = await randomBytesAsync(32);
    return buffer.toString('hex');
  },
  deleteFile: async (pathFile) => {
    const pathToDelete = join(__dirname, '../', '/data/images/', pathFile);
    await unlinkAsync(pathToDelete);
  }
}