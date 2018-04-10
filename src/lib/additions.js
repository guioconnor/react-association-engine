import { random } from "lodash";

const generateAdditionExpression = (
  allowZero,
  highestValue,
  exeptions = [],
  icon
) => {
  let value;
  do {
    value = random(allowZero ? 0 : 2, highestValue);
  } while (exeptions.includes(value));
  const firstOperand = random(allowZero ? 0 : 1, value - (allowZero ? 0 : 1));
  const secondOperand = value - firstOperand;

  return { value, firstOperand, secondOperand, icon };
};

export default generateAdditionExpression;
