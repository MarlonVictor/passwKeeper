import { ReactNode } from 'react';
import ReactModal from 'react-modal';


interface ModalProps {
  isOpen: boolean;
  title: string;
  width: string;
  children: ReactNode;
}

export function Modal(data: ModalProps) {
  return (
    <ReactModal
      isOpen={data.isOpen}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={`flex flex-col w-[${data.width}rem] bg-neutral-dark`}>
        <h1 className='text-neutral-light font-semibold text-xl mb-20'>
          {data.title}
        </h1>

        {data.children}
      </div>
    </ReactModal>
  )
}