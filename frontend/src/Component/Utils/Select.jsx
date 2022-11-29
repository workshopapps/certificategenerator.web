import React from "react";

const Select = (props) => {
	return (
		<select
			className={props.class}
			name={props.name}
			id={props.id}
			onChange={props.onChange}
		>
			{props.list.map((e, i) => (
				<option key={i} value={e.value}>
					{e.label}
				</option>
			))}
		</select>
	);
};

export default Select;
