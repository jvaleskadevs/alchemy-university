import server from "./server";

function Wallet({ signature, setSignature, recoveryBit, setRecoveryBit, nonce, setNonce, /* address, setAddress, balance, setBalance */ }) {
 
/* 
  async function onChangeAddress(evt) {
    const address = evt.target.value;
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
*/

  async function onChangeSignature(evt) {
    const signature = evt.target.value;
    setSignature(signature);
  }
  
  async function onChangeRecoveryBit(evt) {
    const recoveryBit = evt.target.value;
    setRecoveryBit(Number(recoveryBit));
  }
  
  async function onChangeNonce(evt) {
    const nonce = evt.target.value;
    setNonce(nonce);
  }

  return (
    <div className="container wallet">
      <h1>Your Transaction</h1>

      <label>
        Signature

        <input placeholder="Type a signature, for example: 0x1" value={signature} onChange={onChangeSignature}></input>
        
        Recovery Bit
        <input placeholder="Type a recovery bit, for example: 0" value={recoveryBit} onChange={onChangeRecoveryBit}></input>

        Nonce
        <input placeholder="Type a nonce, for example: 0" value={nonce} onChange={onChangeNonce}></input>
 
{/*       
        Wallet
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChangeAddress}></input>
*/}
      </label>
      

      {/*<div className="balance">Balance: {balance}</div>*/}
    </div>
  );
}

export default Wallet;
