import RollResultOccurrencesCalculator from './RollResultOccurrencesCalculator';

const rollResultOccurrencesCalculator = new RollResultOccurrencesCalculator();

export const calculateRollResultOccurrences = ({
  red,
  blue,
  black
}: {
  red: number;
  blue: number;
  black: number;
}) => {
  return rollResultOccurrencesCalculator.calculate(red, blue, black);
};
