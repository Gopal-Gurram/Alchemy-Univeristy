import server from "./server";
import * as secp from "ethereum-cryptography";

import {toHex} from "ethereum-cryptography/utils";
function Wallet({ address, setAddress, balance, setBalance , privateKey , setPrivateKey }) {
  async function onChange(evt) {
 const privateKey = evt.target.value;
 const address = secp.getPublicKey(privateKey);
 setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
         PrivateKey
        <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        Address : {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
