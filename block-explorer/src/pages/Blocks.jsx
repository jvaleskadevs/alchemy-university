import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Blocks = ({ getLastBlock }) => {
 	const navigate = useNavigate();
 	
 	const [blocks, setBlocks] = useState();
 	
 	const getLastBlocks = async () => {
 		const lastBlock = await getLastBlock();
 		setBlocks([lastBlock, lastBlock - 1,  lastBlock - 2,  lastBlock - 3,  lastBlock - 4,  lastBlock - 5, lastBlock - 6]);
 	}
 	
 	useEffect(() => {
 		getLastBlocks();
 		// eslint-disable-next-line
 	}, []);
	
	return (
		<div className="flex flex-col max-w-[80%] text-white bg-[#242442] rounded-[20px] px-[44px] pb-[24px] my-8 m-auto">
		
			<h3 className="font-semibold p-[36px]">Last blocks:</h3>
			{ blocks && blocks.map((block, i) => (
				<div 
					className="bg-[#121224] p-4 m-2 rounded-[20px] text-[#b5b5b5] cursor-pointer hover:text-[white]"
					key={i}
					onClick={(e) => navigate(`/block/${e.target.textContent}`)}
					value={block}
				>
					{block}
				</div>
			))}
		</div>
	);
}

export default Blocks;
