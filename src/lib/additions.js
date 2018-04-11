import { random } from "lodash";

const generateAdditionExpression = (
  allowZero,
  highestValue,
  exceptions = [],
  icon
) => {
  let value;
  do {
    value = random(allowZero ? 0 : 2, highestValue);
  } while (exceptions.includes(value));
  const firstOperand = random(allowZero ? 0 : 1, value - (allowZero ? 0 : 1));
  const secondOperand = value - firstOperand;

  return { value, firstOperand, secondOperand, icon, operation: "ADDITION" };
};

export default generateAdditionExpression;
