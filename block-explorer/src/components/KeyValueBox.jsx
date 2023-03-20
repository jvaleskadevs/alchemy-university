import { useNavigate } from 'react-router-dom';
const KeyValueBox = ({ boxKey, value , clickable}) => {
	const navigate = useNavigate();
	clickable = clickable || (value && typeof value === 'string' && value.startsWith('0x') && (value.length === 42 || value.length === 66));
	
	const onClick = (val) => {
		if (val.length === 42) {
			navigate(`/address/${val}`);
		} else if (val.length === 66) {
			navigate(`/tx/${val}`);
		} else {
			navigate(`/block/${val}`);
		}
	}
	
	return (
		<div className="bg-[#121224] text-[red] p-4 rounded-[20px]">
			{boxKey}

			<span 
				className={`text-[#b5b5b5] ${clickable && 'cursor-pointer hover:text-[white]'}`}
				onClick={(e) => { if (clickable) onClick(e.target.textContent) }}>
				{value}
			</span>
		</div>
	);
}

export default KeyValueBox;
