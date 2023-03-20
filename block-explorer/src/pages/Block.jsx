import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BlockTransactions, KeyValueBox } from '../components/';

const Block = ({ getBlock }) => {
	const params = useParams();
	
	const [block, setBlock] = useState();

	const fetchBlock = async () => {
		let blockNumberOrHash = params.block.length === 66 ? params.block : parseInt(params.block);
		const block = await getBlock(blockNumberOrHash);
		setBlock(block);
	}
	
	useEffect(() => {
		fetchBlock();
		// eslint-disable-next-line
	}, [params]);
	
	return (
		<div className="flex flex-row rounded-[20px]">
			{block && (
			<div className="flex flex-row w-full justify-around bg-[#121224] rounded-[20px] m-[24px] p-[16px]">
				
				
				<div className="flex flex-col rounded-[20px] bg-[#242442] gap-3 px-[44px]">
					<h3 className="text-white font-semibold m-[36px]">Block Info:</h3>
					<KeyValueBox
						boxKey="Block Height: "
						value={block.number}
						clickable
					/>
					<KeyValueBox
						boxKey="Block Hash: "
						value={block.hash}
					/>
					<KeyValueBox
						boxKey="Timestamp: "
						value={block.timestamp}
					/>
					<KeyValueBox
						boxKey="Nonce: "
						value={block.nonce}
					/>
					<KeyValueBox
						boxKey="Difficulty: "
						value={block.difficulty}
					/>
					<KeyValueBox
						boxKey="Gas Used: "
						value={block.gasUsed.toString()}
					/>
					<KeyValueBox
						boxKey="Gas Limit: "
						value={block.gasLimit.toString()}
					/>
					<KeyValueBox
						boxKey="Base Fee per Gas: "
						value={block.baseFeePerGas?.toString()}
					/>
					<KeyValueBox
						boxKey="Miner Address: "
						value={block.miner}
					/>
					<KeyValueBox
						boxKey="Parent Hash: "
						value={block.parentHash}
					/>			
				</div>
				
				
				<div className="flex flex-col text-white bg-[#242442] rounded-[20px] px-[44px]">
					<h3 className="font-semibold p-[36px]">Block Transactions:</h3>
					<BlockTransactions transactions={block.transactions} />
				</div>
			</div>
			)}
		</div>
	);
}

export default Block;
