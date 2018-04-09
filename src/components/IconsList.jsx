import React from "react";

const IconsList = ({ icons = [] }) => (
  <ul>{icons.map(icon => <li>{icon}</li>)}</ul>
);

export default IconsList;
