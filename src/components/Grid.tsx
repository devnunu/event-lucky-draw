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
    <div className="grid grid-cols-10 gap-2 p-4 bg-white rounded-lg shadow-lg" style={{ gap: '20px' }}>
      {numbers.map((number) => {
        const isDisabled = disabledNumbers.includes(number);
        const isWinningNumber = winningNumbers.includes(number);
        
        return (
          <button
            key={number}
            className={`relative w-20 h-20 text-lg font-bold rounded-lg transition-all ${
              isDisabled
                ? isWinningNumber
                  ? 'bg-white border-none p-0'
                  : 'bg-white border-none p-0'
                : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 p-2'
            }`}
            onClick={() => onClick(number)}
            disabled={isDisabled}
            style={{ margin: '0px' }} // 버튼 내부의 추가 간격 제거
          >
            {isDisabled ? (
              isWinningNumber ? (
                <div className="w-full h-full relative p-2">
                  <Image 
                    src="/finda.jpg" 
                    alt="Disabled" 
                    layout="fill" 
                    objectFit="contain" 
                    className="rounded-lg" 
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
