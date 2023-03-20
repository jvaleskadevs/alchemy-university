import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { KeyValueBox } from '../components/';

const Transaction = ({ getTx }) => {
	const params = useParams();
	const navigate = useNavigate();
	
	const [tx, setTx] = useState();
	
	const fetchTx = async () => {
		const tx = await getTx(params.tx);
		if (!tx) {
			navigate(`/block/${params.tx}`);
		}
		setTx(tx);

	}
	
	useEffect(() => {
		fetchTx();
		// eslint-disable-next-line
	}, [params]);
	
	return (
		<div className="flex flex-col max-w-[80%] text-white bg-[#242442] rounded-[20px] px-[44px] pb-[24px] my-0 m-auto">
			<h3 className="font-semibold p-[36px]">Transaction Info:</h3>
			{ tx && (
				<div className="flex flex-col gap-1">
					<KeyValueBox
						boxKey="Tx Hash: "
						value={tx.transactionHash}
					/>
					<KeyValueBox
						boxKey="From: "
						value={tx.from}
					/>
					<KeyValueBox
						boxKey="To: "
						value={tx.to}
					/>
					<KeyValueBox
						boxKey="Status: "
						value={tx.status}
					/>
					<KeyValueBox
						boxKey="Confirmations: "
						value={tx.confirmations}
					/>
					<KeyValueBox
						boxKey="Gas Used: "
						value={tx.gasUsed.toString()}
					/>
					<KeyValueBox
						boxKey="Cumulative Gas: "
						value={tx.cumulativeGasUsed.toString()}
					/>
					<KeyValueBox
						boxKey="Effective Gas Price: "
						value={tx.effectiveGasPrice.toString()}
					/>		
					{ tx.contractAddress && (
						<KeyValueBox
							boxKey="Contract address: "
							value={tx.contractAddress}
						/>
					)}
					<KeyValueBox
						boxKey="Tx Index: "
						value={tx.transactionIndex}
					/>	
					<KeyValueBox
						boxKey="Type: "
						value={tx.type}
					/>
					<KeyValueBox
						boxKey="Byzantium: "
						value={tx.byzantium.toString()}
					/>
					<KeyValueBox
						boxKey="Block Number: "
						value={tx.blockNumber}
					/>
					<KeyValueBox
						boxKey="Block Hash: "
						value={tx.blockHash}
					/>
					<KeyValueBox
						boxKey="Logs: "
						value={tx.logs.length}
					/>	
				</div>
			)}
		</div>
	);
}

export default Transaction;
