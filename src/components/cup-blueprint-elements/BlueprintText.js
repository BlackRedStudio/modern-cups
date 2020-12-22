import React from 'react';

const BlueprintText = ({props: {fontSize, color, value}, click}) => {
	return (
		<div
			className="text-draggable"
			style={{ position: 'absolute', left: 30, top: 30, padding: 20, fontSize: fontSize+'px', color: color }}
			onClick={click}
		>
			{value}
		</div>
	);
};

export default BlueprintText;
