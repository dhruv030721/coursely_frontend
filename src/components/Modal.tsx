import { Modal as MuiModal } from "@mui/material"
import { ReactNode } from "react"

interface ModalProps {
    open: boolean,
    modelElement: ReactNode,
    handleClose?: () => void
}

const CustomModal = ({ open, modelElement, handleClose }: ModalProps) => {
    return (
        <div>
            <MuiModal
                open={open}
                onClose={handleClose}
            >
                <div>
                    {modelElement}
                </div>
            </MuiModal>
        </div>
    )
}

export default CustomModal
