import React from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  result: string | null;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-2xl font-bold mb-6 text-gray-800">
          {result === '당첨!' ? '축하합니다! 당첨되었습니다!' : '아쉽네요. 꽝입니다!'}
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Dialog;
