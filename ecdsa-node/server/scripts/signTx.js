const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

const dotenv = require('dotenv').config();
const fs = require('fs');


async function signTxs(nonce) { 
	//let nonce = getCurrentNonce();
	const promises = Object.keys(process.env).map(async (value, index) => {
		if (value.slice(0, -1) === "CLIENT_PRIVATE_KEY_") {
		
			const privateKey = process.env[value];
			const publicKey = secp.getPublicKey(privateKey);
			const address = toHex(keccak256(publicKey.slice(-1).slice(-20)));
			const hash = keccak256(utf8ToBytes(nonce.toString()));
			const [signature, recoveryBit] = await secp.sign(hash, privateKey, { recovered: true });
			
			const promise = {};
			promise.privateKey = privateKey;
			promise.address = address;
			promise.signature = toHex(signature);
			promise.recoveryBit = recoveryBit;
			promise.nonce = nonce;
			
			return promise;
		};
	});
	return await Promise.all(promises).then((promise) => promise.filter((promise) => promise !== undefined));
}


function printSignatures(signatures) {
	console.log("-----------");
	console.log("********** Transaction Signatures: **********");
	console.log("-----------");
	
	for (let i = 0; i < signatures.length; i++) {
		console.log(`----------- From CLIENT_PRIVATE_KEY_${i}`);
		if (signatures[i]) {
			console.log(signatures[i]);
		}
		console.log("-----------");
	}
}

function getCurrentNonce() {
	const nonce = JSON.parse(fs.readFileSync('./scripts/nonce.json'))
	return nonce.nonce;
}

function storeCurrentNonce(nonce) {
	const nonceJSON = `{ "nonce": ${nonce} }`;
	fs.writeFileSync('./scripts/nonce.json', nonceJSON, (err) => {
		console.log(err);
	});
}


async function main() {
	try {
		const nonce = getCurrentNonce();
		const signatures = await signTxs(nonce);
		printSignatures(signatures);
		storeCurrentNonce(nonce + 1);
		process.exit(0);
	} catch(err) {
		console.log(err);
		process.exit(1);
	}
}

main();
