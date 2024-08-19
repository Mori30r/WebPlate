import React from "react";
import ReactModal from "react-modal";

interface Props {
    isOpen: boolean;
    children: React.ReactNode;
}

function Modal({ isOpen, children }: Props) {
    return (
        <ReactModal
            isOpen={isOpen}
            style={{
                overlay: {
                    zIndex: 10,
                    backgroundColor: "rgba(15,14,19, .8)",
                },
                content: {
                    top: "50%",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    width: "60%",
                    height: "60%",
                    backgroundColor: "rgb(15,14,19)",
                    borderColor: "black",
                },
            }}
        >
            {children}
        </ReactModal>
    );
}

export default Modal;
