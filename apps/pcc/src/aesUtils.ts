import crypto from 'crypto';
import fs from 'fs';

export const encrypt = async (data) => {
  const algorithm = 'aes-256-cbc';
  const key = fs.readFileSync('./key.txt');
  const key1 = key.toString();
  const Securitykey = Buffer.from(key1 + process.env.KEY);

  // the cipher function
  const cipher = crypto.createCipher(algorithm, Securitykey);

  const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

  return encrypted;
};
