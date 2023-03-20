import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SearchBar () {
	const navigate = useNavigate();
	
	const [value, setValue] = useState('');
	
	const onChange = (e) => {
		setValue(e);
	}
	
	const onClick = () => {
		if (value.length === 42) {
			navigate(`/address/${value}`);
		} else if (value.length === 66) {
			navigate(`/tx/${value}`);
		} else {
			navigate(`/block/${value}`);
		}
	}
	
	const onKeyPress = (e) => {
		if (e.key === 'Enter') {
			onClick();
		}
	}

	return (
		<form className="max-w-[512px] min-w-[512px] m-auto mb-8 mt-2">   
			<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				    <svg 
				    	aria-hidden="true" 
				    	className="w-5 h-5 text-gray-500 dark:text-gray-400" 
				    	fill="none" 
				    	stroke="currentColor" 
				    	viewBox="0 0 24 24" 
				    	xmlns="http://www.w3.org/2000/svg"
		    		>
				    	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
			    	</svg>
				</div>
				<input 
					type="search" 
					id="default-search" 
					className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" 
					placeholder="Search Addresses, Transactions, Blocks..." 
					onChange={(e) => onChange(e.target.value)}
					onKeyPress={(e) => onKeyPress(e)}
				/>
				<button 
					type="button" 
					className="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
					onClick={onClick}
				>
						Search
				</button>
			</div>
		</form>
	);
}
