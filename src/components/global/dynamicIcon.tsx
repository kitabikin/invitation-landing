import React from 'react';
import * as Md from 'react-icons/md';

const DynamicIcon = (props) => {
  const { iconName, size, color } = props;
  const icon = React.createElement(Md[iconName]);
  return <div style={{ fontSize: size, color: color }}>{icon}</div>;
};

export default DynamicIcon;
