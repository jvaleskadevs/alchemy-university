import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { KeyValueBox } from '../components/';
import { Utils } from 'alchemy-sdk';

const Address = ({ getBalance }) => {
	const params = useParams();
	
	const [balance, setBalance] = useState();
	
	const fetchBalance = async () => {
		const balance = await getBalance(params.address);
		setBalance(balance);
	}
	
	useEffect(() => {
		fetchBalance();
		// eslint-disable-next-line
	}, [params]);
		
	return (
		<div className="flex flex-col max-w-[80%] text-white bg-[#242442] rounded-[20px] px-[44px] pb-[24px] my-0 m-auto">
			<h3 className="font-semibold p-[36px]">Address Balance:</h3>
			{ balance && (
				<div className="flex flex-col gap-1">
					<KeyValueBox
						boxKey="Address: "
						value={params.address}
					/>
					
					<KeyValueBox
						boxKey="Balance: "
						value={Utils.formatUnits(balance.toString(), 'ether').toString()}
					/>

				</div>
			)}
		</div>	
	);
}

export default Address;
