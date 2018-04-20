import { random } from "lodash";

const generateSubtractionExpression = (allowZero, highestValue) => {
  let firstOperand;
  firstOperand = random(allowZero ? 0 : 2, highestValue - 1);
  const secondOperand = random(
    allowZero ? 0 : 1,
    firstOperand - (allowZero ? 0 : 1)
  );
  const value = firstOperand - secondOperand;

  return { value, firstOperand, secondOperand, operation: "SUBTRACTION" };
};

export default generateSubtractionExpression;
