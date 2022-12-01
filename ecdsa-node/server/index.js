const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

const app = express();
const cors = require("cors");
const port = 3042;


app.use(cors());
app.use(express.json());

const balances = {
  "e2841c86ef1d799bf5e676e49370ca6b3a9a883366052e09a0f0b06cf86f96ce": 100,
  "2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de": 50,
  "4de0e96b0a8886e42a2c35b57df8a9d58a93b5bff655bc37a30e2ab8e29dc066": 75,
};
// An object to track the total tx count of every publicKey
const totalTx = { 
  "e2841c86ef1d799bf5e676e49370ca6b3a9a883366052e09a0f0b06cf86f96ce": 0,
  "2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de": 0,
  "4de0e96b0a8886e42a2c35b57df8a9d58a93b5bff655bc37a30e2ab8e29dc066": 0,  
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/balances", (req, res) => {
  res.send({balances});
});

app.post("/send", async (req, res) => {
  //const { sender, recipient, amount } = req.body;
  const { signature, recipient, amount } = req.body;
  const nonceHash = keccak256(utf8ToBytes(signature[2].toString()));
   
  console.log(signature);
  
  try {
	  const publicKey = await secp.recoverPublicKey(
	  	nonceHash,  	/* msgHash */ 
	  	signature[0] 	/* signature */, 
	  	signature[1] 	/* recovery bit */ 
      );
	  const sender = getAddressFrom(publicKey);
	  console.log(sender);	  

	  setInitialBalance(sender);
	  setInitialBalance(recipient);
	  

	  if (balances[sender] < amount) {
		res.status(400).send({ message: "Not enough funds!" });
	  } else {
		// To check whether the nonce is a valid one or not
		const txCountHash = keccak256(utf8ToBytes(totalTx[sender].toString()));
		if (toHex(txCountHash) !== toHex(nonceHash)) {
		  res.status(400).send({ message: "Invalid nonce" });
		} else {
		  balances[sender] -= amount;
		  balances[recipient] += amount;
		  totalTx[sender] += 1;
		  res.send({ balance: balances[sender], balances: { balances } });		
		}
	  } 
  } catch(err) {
  	console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function getAddressFrom(publicKey) {
  return toHex(keccak256(publicKey.slice(-1).slice(-20)));
}

