import React from 'react'

const BlueprintImage = ({imgSrc, index, mouseOver}) => {
    return (
        <div
        className="image-draggable"
            style={{ position: 'absolute', top: 30, left: 30, width: 100, height: 100, backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: 'url('+imgSrc+')', borderRadius: 4 }}
            src={imgSrc}
            index={index}
            onMouseOver={mouseOver}
            alt=""
        ></div>
    )
}

export default BlueprintImage
