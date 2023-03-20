import { Alchemy, Network } from 'alchemy-sdk';
import { Route, Routes } from 'react-router-dom';

import { SearchBar } from './components';
import { Address, Block, Blocks, Transaction } from './pages';

function App() {
  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);
 
  async function getTransaction(txHash) {
  	return await alchemy.core.getTransactionReceipt(txHash);
  }
  
  async function getBlock(blockNumberOrHash) {
  	return await alchemy.core.getBlock(blockNumberOrHash);
  }
  
  async function getLastBlock() {
  	return await alchemy.core.getBlockNumber();
  }
  
  async function getBalance(address) {
  	const balance = await alchemy.core.getBalance(address);
  	return balance;
  }

  return (
	<div className="relative sm:-8 p-4 bg-[#13131a] bg-[#121224] min-h-screen min-w-screen flex flex-col text-center">
		<h1 className="text-white my-[40px] text-3xl font-bold underline">Block Explorer</h1>
		
		<SearchBar />
		
		<Routes>
			<Route path="/" 
				element={<Blocks getLastBlock={getLastBlock} />} 
			/>
			<Route path="/block/:block" 
				element={<Block getBlock={getBlock} />}
			/>
			<Route path="/tx/:tx"
				element={<Transaction getTx={getTransaction} />} 
			/>
			<Route path="/address/:address"
				element={<Address getBalance={getBalance} />} 
			/>
		</Routes>
	</div>
	);
}

export default App;
