import { expect } from 'chai';

import util from 'util';
import crypto from 'crypto';

import { digitallySign } from '.';

const generateKeyPair = util.promisify(crypto.generateKeyPair);

describe('Digest', () => {
  it('should work', async() => {
    const { privateKey, publicKey } = await generateKeyPair("rsa", {
      modulusLength: 2048,
    });
    expect(privateKey).to.not.be.null;
    const body = 'some msg here';
    const result = digitallySign({
      body,
      privateKey
    });
    console.log({result})

    const verify = crypto.createVerify('SHA256');
    verify.update(Buffer.from(body, 'utf8'));
    const verifyResult = verify.verify(publicKey, Buffer.from(result.signatureHex, 'hex'));
    console.log({verifyResult});
    expect(verifyResult).to.eql(true);
  });
});