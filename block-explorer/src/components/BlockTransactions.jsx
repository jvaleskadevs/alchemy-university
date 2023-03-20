import { useNavigate } from 'react-router-dom';

const BlockTransactions = ({ transactions }) => {
 	const navigate = useNavigate();
	
	return (
		<div className="">
			{ transactions && transactions.map((tx, i) => (
				<div 
					className="text-[#b5b5b5] cursor-pointer hover:text-[white]"
					key={i}
					onClick={(e) => navigate(`/tx/${e.target.textContent}`)}
					value={tx}
				>
					{tx}
				</div>
			))}
		</div>
	);
}

export default BlockTransactions;
