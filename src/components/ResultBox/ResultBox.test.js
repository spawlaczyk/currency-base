import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      { from: 'PLN', to: 'USD', amount: '7', expectedResult: 'PLN 7.00 = $2.00' },
      { from: 'PLN', to: 'USD', amount: '28', expectedResult: 'PLN 28.00 = $8.00' },
      { from: 'PLN', to: 'USD', amount: '100', expectedResult: 'PLN 100.00 = $28.57' },
      { from: 'PLN', to: 'USD', amount: '489', expectedResult: 'PLN 489.00 = $139.71' },
    ];

    for(const testObj of testCases){
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expectedResult);
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    const testCases = [
      { from: 'USD', to: 'PLN', amount: '5', expectedResult: '$5.00 = PLN 17.50' },
      { from: 'USD', to: 'PLN', amount: '32', expectedResult: '$32.00 = PLN 112.00' },
      { from: 'USD', to: 'PLN', amount: '117', expectedResult: '$117.00 = PLN 409.50' },
      { from: 'USD', to: 'PLN', amount: '704', expectedResult: '$704.00 = PLN 2,464.00' },
    ];

    for(const testObj of testCases){
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expectedResult);
      cleanup();
    }
  });

  it('should render proper info about conversion when PLN -> PLN/USD -> USD', () => {
    const testCases = [
      { from: 'PLN', to: 'PLN', amount: '1', expectedResult: 'PLN 1.00 = PLN 1.00' },
      { from: 'PLN', to: 'PLN', amount: '328', expectedResult: 'PLN 328.00 = PLN 328.00' },
      { from: 'USD', to: 'USD', amount: '55', expectedResult: '$55.00 = $55.00' },
      { from: 'USD', to: 'USD', amount: '682', expectedResult: '$682.00 = $682.00' },
    ];

    for(const testObj of testCases){
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />)
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expectedResult);
      cleanup();
    }
  });

  it('should render error when input is a negative number', () => {
    const testCases = [
      { from: 'PLN', to: 'USD', amount: '-1' },
      { from: 'PLN', to: 'USD', amount: '-76' },
      { from: 'USD', to: 'PLN', amount: '-104' },
      { from: 'USD', to: 'PLN', amount: '-65' },
    ];

    for(const testObj of testCases){
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value');
      cleanup();
    }
  });
});