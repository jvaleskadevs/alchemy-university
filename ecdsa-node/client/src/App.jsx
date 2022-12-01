import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Balances from "./Balances";
import "./App.scss";
import { useState } from "react";


function App() {
  //const [balance, setBalance] = useState(0);
  //const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState(0);
  
  const [nonce, setNonce] = useState(0);
  const [balances, setBalances] = useState({});

  return (
    <div className="app">
      <Wallet
        signature={signature}
        setSignature={setSignature}
        recoveryBit={recoveryBit}
        setRecoveryBit={setRecoveryBit}
        nonce={nonce}
        setNonce={setNonce}
        //balance={balance}
        //setBalance={setBalance}
        //address={address}
        //setAddress={setAddress}
      />
      <Transfer 
      	//setBalance={setBalance} 
      	setBalances={setBalances} 
      	signature={[signature, recoveryBit, nonce]}
	  />
      <Balances balances={balances} setBalances={setBalances} />
    </div>
  );
}

export default App;
