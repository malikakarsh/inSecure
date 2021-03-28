import { useEffect, useState } from "react";

function Test() {
	const [currentTime, setCurrentTime] = useState(0);

	//executes only when state changes
	useEffect(() => {
		fetch("/time")
			.then(res => res.json())
			.then(data => {
				setCurrentTime(data.time);
			});
	}, []);

	return (
		<div>
			<p>Current Time is {currentTime}</p>
		</div>
	);
}

export default Test;
