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
				last50Weeks.push(date);
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

	const getDayOfWeek = (date) => {
		return date.getDay();
	};

	const getSortedDates = (dates) => {
		const sortedDates = [];
		for (let i = 0; i < 51; i++) {
			const week = [];
			for (let j = 0; j < 7; j++) {
				const index = i * 7 + j;
				if (index < dates.length) {
					week.push(dates[index]);
				} else {
					week.push(null);
				}
			}
			week.sort((a, b) => {
				if (!a) return 1;
				if (!b) return -1;
				const dayA = getDayOfWeek(a);
				const dayB = getDayOfWeek(b);
				return (dayA === 0 ? 7 : dayA) - (dayB === 0 ? 7 : dayB);
			});
			sortedDates.push(...week);
		}
		return sortedDates;
	};

	const sortedDates = getSortedDates(dates);

	return (
		<div className="blocks">
			{[...Array(51)].map((_, weekIndex) => (
				<div key={weekIndex} className="column">
					{[...Array(7)].map((_, dayIndex) => {
						const index = weekIndex * 7 + dayIndex;
						const date = sortedDates[index];
						return (
							<div
								key={index}
								className={`day ${
									date
										? getColor(
												contributions[date.toISOString().split('T')[0]] || 0
										  )
										: 'gray'
								}`}
								tabIndex={0}
								title={
									date
										? `${date.toISOString().split('T')[0]}: ${
												contributions[date.toISOString().split('T')[0]] || 0
										  } commits`
										: ''
								}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
}
