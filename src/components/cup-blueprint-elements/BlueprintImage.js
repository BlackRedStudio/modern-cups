import React from 'react'

const BlueprintImage = ({imgSrc, click}) => {
    return (
        <img
            style={{ position: 'absolute', top: 0, left: 0, width: 100, objectFit: 'cover', borderRadius: 4 }}
            src={imgSrc}
            onClick={click}
            alt=""
        />
    )
}

export default BlueprintImage
