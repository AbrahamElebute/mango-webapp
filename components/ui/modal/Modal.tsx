"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  contentClassName?: string;
  dialogEnterFromAnimation?: string;
  dialogEnterTransition?: string;
  dialogEnterToAnimation?: string;
  dialogLeaveTransition?: string;
  dialogLeaveFromAnimation?: string;
  dialogLeaveToAnimation?: string;
  className?: string;
  closeOnClickOutside?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  opened,
  onClose,
  children,
  contentClassName = "",
  className = "",
  dialogEnterFromAnimation = "opacity-0 scale-95",
  dialogEnterTransition = "ease-out duration-300",
  dialogEnterToAnimation = "opacity-100 scale-100",
  dialogLeaveTransition = "ease-in duration-200",
  dialogLeaveFromAnimation,
  dialogLeaveToAnimation,
  closeOnClickOutside = false,
}) => {
  const [isOpen, setIsOpen] = useState(opened);

  useEffect(() => {
    setIsOpen(opened);
  }, [opened]);

  const handleClose = () => {
    onClose?.();
    setIsOpen(false);
  };

  const onCloseFunc = closeOnClickOutside
    ? handleClose || (() => {})
    : () => {};
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onCloseFunc}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-foreground bg-opacity-30 backdrop-blur-[10px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto custom-scroll">
          <div
            className={`min-h-full flex items-center justify-center w-full relative`}
          >
            <Transition.Child
              as={Fragment}
              enter={dialogEnterTransition}
              enterFrom={dialogEnterFromAnimation}
              enterTo={dialogEnterToAnimation}
              leave={dialogLeaveTransition}
              leaveFrom={dialogLeaveFromAnimation || dialogEnterToAnimation}
              leaveTo={dialogLeaveToAnimation || dialogEnterFromAnimation}
            >
              <Dialog.Panel
                className={`w-full relative overflow-auto overflow-x-hidden transition-all  flex items-center justify-center `}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
