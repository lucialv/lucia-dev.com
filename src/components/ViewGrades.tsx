import React, { useState } from "react";
import { X } from "lucide-react";

type ImageModalProps = {
  imageUrl: string;
};

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <span
        onClick={openModal}
        className="underline text-purple-500 cursor-pointer"
      >
        Ver notas
      </span>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="fixed top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Cerrar imagen"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="max-w-full max-h-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt="Imagen en tamaño completo"
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: "90vh", maxWidth: "90vw" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
