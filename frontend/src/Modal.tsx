import React from 'react';

interface Document {
  title: string;
  content: string;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  documents: Document[];
}

const Modal: React.FC<ModalProps> = ({ show, onClose, documents }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      
      <div className="relative bg-white p-6 rounded-md shadow-lg w-96">
      <button
        className="absolute top-2 right-2 text-[10px] p-1 bg-gray-500 text-white w-5 h-5 rounded-full hover:bg-gray-600 focus:outline-none"
        onClick={onClose}
          >
        X
      </button>
        <h3 className="text-l font-semibold text-gray-800 mb-4">Documenti Correlati:</h3>
        {documents.length === 0 ? (
          <p className="text-gray-600">Nessun documento trovato.</p>
        ) : (
          <ul className="space-y-4">
            {documents.map((doc, index) => (
              <li key={index} className="p-4 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300">
                <h4 className="font-semibold text-gray-800">{doc.title}</h4>
                <p className="text-gray-600">{doc.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Modal;
