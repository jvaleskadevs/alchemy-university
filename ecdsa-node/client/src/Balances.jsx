import server from "./server";
import { useEffect } from 'react'; 

function Balances({balances, setBalances}) {
	console.log(balances);
	
	useEffect(() => {
		async function fetchBalances() {
			const { data: { balances }} = await server.get('balances');
			setBalances(balances);
			console.log(balances);
		};
		fetchBalances();
	}, [])
	
	return (
		<div className="container wallet">
			<h1>Balances</h1>
			{
				balances ? Object.keys(balances).map((value, index) => {
					return (
						<div key={index}>
							<p>{value}</p>
							<p className='balance'>{balances[value]}</p>
						</div>
					);
				})
				
				:
				
				null
			}
		</div>
	);
}
export default Balances;
