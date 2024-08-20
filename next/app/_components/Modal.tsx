import React from "react";
import ReactModal from "react-modal";
import { HiXMark } from "react-icons/hi2";

interface Props {
    isOpen: boolean;
    handleCloseModal: () => void;
    children: React.ReactNode;
}

function Modal({ isOpen, handleCloseModal, children }: Props) {
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
                    width: "65%",
                    height: "65%",
                    backgroundColor: "#151419",
                    borderColor: "black",
                    overflow: "hidden",
                },
            }}
        >
            <div className="flex justify-end cursor-pointer">
                <HiXMark size={25} strokeWidth={1} onClick={handleCloseModal} />
            </div>
            {children}
        </ReactModal>
    );
}

export default Modal;
