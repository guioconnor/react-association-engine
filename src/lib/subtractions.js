import { random } from "lodash";

const generateSubtractionExpression = (
  allowZero,
  highestValue,
  exceptions = [],
  icon
) => {
  let firstOperand;
  do {
    firstOperand = random(allowZero ? 0 : 2, highestValue - 1);
  } while (exceptions.includes(firstOperand));
  const secondOperand = random(
    allowZero ? 0 : 1,
    firstOperand - (allowZero ? 0 : 1)
  );
  const value = firstOperand - secondOperand;

  return { value, firstOperand, secondOperand, icon, operation: "SUBTRACTION" };
};

export default generateSubtractionExpression;
