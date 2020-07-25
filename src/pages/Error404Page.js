import React from 'react'
import { Typography } from '@material-ui/core'

const Error404Page = () => {
    return (
        <div className="error-404" style={{paddingTop: 40}}>
            <Typography align="center" variant="h1" variantMapping={{h1: 'h2'}}>
                Nie ma takiej strony
            </Typography>
        </div>
    )
}

export default Error404Page
