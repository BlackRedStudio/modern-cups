import React from 'react'

const BlueprintImage = ({imgSrc, index, mouseOver}) => {
    return (
        <img
        className="image-draggable"
            style={{ position: 'absolute', top: 30, left: 30, width: 100, objectFit: 'cover', borderRadius: 4 }}
            src={imgSrc}
            index={index}
            onMouseOver={mouseOver}
            alt=""
        />
    )
}

export default BlueprintImage
