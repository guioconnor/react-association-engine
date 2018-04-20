import React from "react";
import { range, shuffle, slice, random } from "lodash";

import Expression from "./components/Expression";
import AssociationEngine from "./AssociationEngine";
import { LEVELS, MIN_RESULTS_COUNT } from "./config";

import generateAdditionExpression from "./lib/additions";
import generateSubtractionExpression from "./lib/subtractions";

const getRandomOptions = (count, level, expression) => {
  const validValues = [
    expression.value,
    expression.firstOperand,
    expression.secondOperand
  ];
  const randomValues = shuffle(
    range(1, LEVELS[level].maxValue + 1).filter(
      value => !validValues.includes(value)
    )
  );

  return shuffle(
    slice(
      Array.from(new Set([...validValues, ...randomValues])),
      0,
      MIN_RESULTS_COUNT
    )
  );
};

const expressionGenerator = (level, expressions, icon) => {
  const generator =
    random(1, 2) === 1
      ? generateAdditionExpression
      : generateSubtractionExpression;

  return generator(
    LEVELS[level].allowZero,
    LEVELS[level].maxValue,
    [
      ...expressions.map(expression => expression.value),
      ...expressions.map(expression => expression.firstOperand)
    ],
    icon
  );
};

const resultsGenerator = (level, expression) =>
  getRandomOptions(MIN_RESULTS_COUNT, level, expression);

const Arithmetic = () => (
  <AssociationEngine
    Expression={Expression}
    levels={LEVELS}
    expressionGenerator={expressionGenerator}
    resultsGenerator={resultsGenerator}
  />
);

export default Arithmetic;
