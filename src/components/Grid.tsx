import React from 'react';
import Image from 'next/image';

interface GridProps {
  onClick: (number: number) => void;
  disabledNumbers: number[];
  winningNumbers: number[];
}

const Grid: React.FC<GridProps> = ({ onClick, disabledNumbers, winningNumbers }) => {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4 p-4 bg-white rounded-lg shadow-lg">
      {numbers.map((number) => {
        const isDisabled = disabledNumbers.includes(number);
        const isWinningNumber = winningNumbers.includes(number);
        
        return (
          <button
            key={number}
            className={`relative w-full h-20 text-lg font-bold rounded-lg transition-all ${
              isDisabled
                ? isWinningNumber
                  ? 'bg-white border-none p-0'
                  : 'bg-white border-none p-0'
                : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 p-2'
            }`}
            onClick={() => onClick(number)}
            disabled={isDisabled}
          >
            {isDisabled ? (
              isWinningNumber ? (
                <div className="w-full h-full relative p-2">
                  <Image 
                    src="/finda.jpg" 
                    alt="Disabled" 
                    layout="fill" 
                    objectFit="contain" 
                    className="rounded-lg p-2" 
                  />
                </div>
              ) : null
            ) : (
              <span>{number}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Grid;
