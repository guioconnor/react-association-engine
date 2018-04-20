import { random } from "lodash";

const generateAdditionExpression = (allowZero, highestValue) => {
  let value;
  value = random(allowZero ? 0 : 2, highestValue);
  const firstOperand = random(allowZero ? 0 : 1, value - (allowZero ? 0 : 1));
  const secondOperand = value - firstOperand;

  return { value, firstOperand, secondOperand, operation: "ADDITION" };
};

export default generateAdditionExpression;
