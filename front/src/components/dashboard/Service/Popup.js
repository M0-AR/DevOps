import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core'
import Controls from './controls/Controls';
import CloseIcon from '@material-ui/icons/Close'
export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;

    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div style={{display: 'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                    color = "secondary"
                    onClick={() => {setOpenPopup(false)}}>
                        <CloseIcon />

                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children} 
            </DialogContent>
        </Dialog>
    )
}
