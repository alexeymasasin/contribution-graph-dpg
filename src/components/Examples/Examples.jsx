import { useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';

export default function Examples() {
	const [tooltip, setTooltip] = useState(null);

	const handleExampleHover = (id) => {
		if (id) {
			setTooltip({
				id: id,
			});
		} else {
			setTooltip(null);
		}
	};

	const closeTooltip = () => {
		setTooltip(null);
	};

	return (
		<div className="examples-wrapper">
			<p className="example-text">Меньше</p>
			<div className="examples-blocks">
				<div
					className="day"
					onMouseOver={() => handleExampleHover('grey')}
					onMouseLeave={closeTooltip}
					role="button"
				>
					{tooltip && tooltip.id === 'grey' && (
						<Tooltip type="example" contributionAmount="No" />
					)}
				</div>
				<div
					className="day veryLightBlue"
					onMouseOver={() => handleExampleHover('veryLightBlue')}
					onMouseLeave={closeTooltip}
					role="button"
				>
					{tooltip && tooltip.id == 'veryLightBlue' && (
						<Tooltip type="example" contributionAmount="1-9" />
					)}
				</div>
				<div
					className="day lightBlue"
					onMouseOver={() => handleExampleHover('lightBlue')}
					onMouseLeave={closeTooltip}
					role="button"
				>
					{tooltip && tooltip.id === 'lightBlue' && (
						<Tooltip type="example" contributionAmount="10-19" />
					)}
				</div>
				<div
					className="day blue"
					onMouseOver={() => handleExampleHover('blue')}
					onMouseLeave={closeTooltip}
					role="button"
				>
					{tooltip && tooltip.id === 'blue' && (
						<Tooltip type="example" contributionAmount="20-29" />
					)}
				</div>
				<div
					className="day darkBlue"
					onMouseOver={() => handleExampleHover('darkBlue')}
					onMouseLeave={closeTooltip}
					role="button"
				>
					{tooltip && tooltip.id === 'darkBlue' && (
						<Tooltip type="example" contributionAmount="30+" />
					)}
				</div>
			</div>
			<p className="example-text">Больше</p>
		</div>
	);
}
