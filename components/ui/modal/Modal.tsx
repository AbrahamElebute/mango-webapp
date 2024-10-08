"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode, useEffect, useState } from "react";

interface ModalProps {
  opened: boolean; // Controls if the modal should be open or closed
  onClose?: () => void; // Optional close handler
  children: ReactNode; // Modal content
  title?: string; // Optional title for the modal
  contentClassName?: string; // Custom class for the modal panel content
  dialogEnterFromAnimation?: string; // Custom enter from animation
  dialogEnterTransition?: string; // Custom enter transition
  dialogEnterToAnimation?: string; // Custom enter to animation
  dialogLeaveTransition?: string; // Custom leave transition
  dialogLeaveFromAnimation?: string; // Custom leave from animation
  dialogLeaveToAnimation?: string; // Custom leave to animation
  className?: string; // Additional classes for the modal wrapper
}

const Modal: React.FC<ModalProps> = ({
  opened,
  onClose,
  children,
  title,
  contentClassName = "",
  dialogEnterFromAnimation = "opacity-0 scale-95",
  dialogEnterTransition = "ease-out duration-300",
  dialogEnterToAnimation = "opacity-100 scale-100",
  dialogLeaveTransition = "ease-in duration-200",
  dialogLeaveFromAnimation = "opacity-100 scale-100",
  dialogLeaveToAnimation = "opacity-0 scale-95",
  className = "",
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(opened);
  }, [opened]);

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={() => {
          onClose?.();
          setShowModal(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className={`min-h-full w-full relative ${className} `}>
            <Transition.Child
              as={Fragment}
              enter={dialogEnterTransition}
              enterFrom={dialogEnterFromAnimation}
              enterTo={dialogEnterToAnimation}
              leave={dialogLeaveTransition}
              leaveFrom={dialogLeaveFromAnimation}
              leaveTo={dialogLeaveToAnimation}
            >
              <Dialog.Panel
                as="div"
                className={`${contentClassName} fixed w-fit top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] overflow-auto overflow-x-hidden text-left transition-all`}
              >
                <div className="w-fit max-h-[100vh] overflow-y-auto no-scrollbar">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
