export default function Tooltip({
	contributions,
	dayOfWeek,
	day,
	month,
	year,
	type,
}) {
	return (
		<div className="tooltip">
			{type === 'contribution' ? (
				<>
					<p className="tooltip-heading">{contributions} contributions</p>
					<p className="tooltip-date">
						{dayOfWeek === 0
							? 'Воскресенье.'
							: dayOfWeek === 1
							? 'Понедельник'
							: dayOfWeek === 2
							? 'Вторник'
							: dayOfWeek === 3
							? 'Среда'
							: dayOfWeek === 4
							? 'Четверг'
							: dayOfWeek === 5
							? 'Пятница'
							: 'Суббота'}
						, {month} {day}, {year}
					</p>
				</>
			) : (
				''
			)}
		</div>
	);
}
