import React from 'react'
import {Button as MuiButton } from "@material-ui/core"

export default function SubmitButton(props) {

    const {text, size, color, variant ,onClick, ...other} = props

    return (
        <div>
            <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}>
                {text}
            </MuiButton>
        </div>
    )
}
