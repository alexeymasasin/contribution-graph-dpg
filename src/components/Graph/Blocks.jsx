import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Blocks() {
	const [contributions, setContributions] = useState({});
	const [dates, setDates] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://dpg.gg/test/calendar.json');
				setContributions(response.data);
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const calculateDates = () => {
			const today = new Date();
			const last50Weeks = [];
			for (let i = 0; i < 357; i++) {
				const date = new Date(today);
				date.setDate(today.getDate() - i);
				last50Weeks.push(date.toISOString().split('T')[0]);
			}
			setDates(last50Weeks.reverse());
		};

		calculateDates();
	}, []);

	const getColor = (count) => {
		if (count === 0) return 'gray';
		if (count >= 1 && count <= 9) return 'veryLightBlue';
		if (count >= 10 && count <= 19) return 'lightBlue';
		if (count >= 20 && count <= 29) return 'blue';
		if (count >= 30) return 'darkBlue';
		return 'gray';
	};

	return (
		<div className="blocks">
			{dates.map((date, index) => (
				<div
					tabIndex={0}
					key={index}
					className={`day ${getColor(contributions[date] || 0)}`}
					title={`${date}: ${contributions[date] || 0} commits`}
				/>
			))}
		</div>
	);
}
