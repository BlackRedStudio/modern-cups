import React from 'react';

import WebFont from 'webfontloader';

const BlueprintText = ({
	props: { fontSize, color, fontFamily, fontWeight, fontStyle, value },
	index,
	mouseOver,
}) => {
	if (fontFamily !== '') {
		WebFont.load({
			google: {
				families: [fontFamily + ':' + fontWeight],
			},
		});
	}
	return (
		<div
			className="text-draggable"
			index={index}
			style={{
				position: 'absolute',
				left: 30,
				top: 30,
				padding: 20,
				fontSize: fontSize + 'px',
				color: color,
				fontFamily: fontFamily,
				fontWeight: fontWeight,
				fontStyle: fontStyle,
			}}
			onMouseOver={mouseOver}
		>
			{value}
		</div>
	);
};

export default BlueprintText;
