import "./colorPick.style.scss";

import React from "react";

const colorPick = (props) => {
	return (
		<div className="colorPick">
			<div
				className="big"
				style={{ backgroundColor: `${props.bigColor}` }}
				onClick={() => {
					props.setState((prev) => {
						return {
							...prev,
							color: {
								primary: props.bigColor,
								secondary: props.smallColorLeft,
								accent: props.smallColorRight,
							},
						};
					});
				}}
			>
				<div
					className="small"
					style={{ backgroundColor: `${props.smallColorLeft}` }}
				></div>
				<div
					className="small"
					style={{ backgroundColor: `${props.smallColorRight}` }}
				></div>
			</div>
		</div>
	);
};

export default colorPick;
