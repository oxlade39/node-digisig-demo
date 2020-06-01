import crypto from 'crypto';
import util from 'util';

interface DigestHeader {
    name: string,
    signatureHex: string,
    body: string
}

interface Digestable {
    body: string,
    privateKey: crypto.KeyObject
}

export function digitallySign(toDigest: Digestable): DigestHeader {
    // see https://stackoverflow.com/a/54194706
    const sign = crypto.createSign('SHA256')
    sign.update(Buffer.from(toDigest.body, 'utf8'))
    const signature = sign.sign(toDigest.privateKey).toString('hex');
    return {
        name: "Authorization",
        signatureHex: signature,
        body: toDigest.body
    }
}