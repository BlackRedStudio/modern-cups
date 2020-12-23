import React from 'react';

import WebFont from 'webfontloader';

const BlueprintText = ({props: {fontSize, color, fontFamily, value}, click}) => {
	WebFont.load({
		google: {
			families: [fontFamily]
		}
	});
	return (
		<div
			className="text-draggable"
			style={{ position: 'absolute', left: 30, top: 30, padding: 20, fontSize: fontSize+'px', color: color, fontFamily: fontFamily }}
			onClick={click}
		>
			{value}
		</div>
	);
};

export default BlueprintText;
