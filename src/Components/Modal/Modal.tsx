import {PropsWithChildren} from 'react';
import './Modal.scss';

export const Modal = ({ children, isOpen, close }:PropsWithChildren<ModalInterface>) => {

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal__content">
                        <button onClick={close} className="modal__content__close" />
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};


interface ModalInterface {
    isOpen: boolean;
    close: ()=>void;
}