import { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import Dialog from '../components/Dialog';

const Home: React.FC = () => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [disabledNumbers, setDisabledNumbers] = useState<number[]>([]);
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);

  useEffect(() => {
    const generateWinningNumbers = () => {
      const numbers = Array.from({ length: 100 }, (_, i) => i + 1); // 숫자를 100개로 제한
      const shuffled = numbers.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 1); // 당첨 숫자 1개 선택
    };

    const storedNumbers = JSON.parse(localStorage.getItem('disabledNumbers') || '[]');
    setDisabledNumbers(storedNumbers);

    const storedWinningNumbers = JSON.parse(localStorage.getItem('winningNumbers') || '[]');
    if (storedWinningNumbers.length === 0) {
      const generatedWinningNumbers = generateWinningNumbers();
      setWinningNumbers(generatedWinningNumbers);
      localStorage.setItem('winningNumbers', JSON.stringify(generatedWinningNumbers));
    } else {
      setWinningNumbers(storedWinningNumbers);
    }
  }, []);

  const handleClick = (number: number) => {
    const isWinningNumber = winningNumbers.includes(number);
    const resultText = isWinningNumber ? '당첨!' : '꽝';

    setSelectedNumber(number);
    setResult(resultText);
    setDialogOpen(true);

    const updatedDisabledNumbers = [...disabledNumbers, number];
    setDisabledNumbers(updatedDisabledNumbers);
    localStorage.setItem('disabledNumbers', JSON.stringify(updatedDisabledNumbers));
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const resetGrid = () => {
    localStorage.removeItem('disabledNumbers');
    localStorage.removeItem('winningNumbers');
    setDisabledNumbers([]);
    setWinningNumbers([]);
    window.location.reload(); // 페이지 새로고침으로 초기화 반영
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8 text-gray-800 pt-10">
        핀다 <span onClick={resetGrid} className="text-blue-600 cursor-pointer hover:underline">행운</span> 뽑기
      </h1>
      <div className="w-full max-w-screen-lg">
        <Grid onClick={handleClick} disabledNumbers={disabledNumbers} winningNumbers={winningNumbers} />
      </div>
      <Dialog isOpen={dialogOpen} onClose={closeDialog} result={result} />
    </div>
  );
};

export default Home;
