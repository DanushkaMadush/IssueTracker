import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-sm"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;