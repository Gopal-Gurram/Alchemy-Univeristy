const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateK̥̥̥̥̥̥ey = secp.utils.randomPrivateKey();

console.log("privateKey: ", toHex(privateK̥̥̥̥̥̥ey));

const publicKey = secp.getPublicKey(privateK̥̥̥̥̥̥ey);

console.log("publicKey: ", toHex(publicKey));
