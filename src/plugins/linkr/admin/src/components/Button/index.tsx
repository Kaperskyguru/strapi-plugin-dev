import React from "react";
import PropTypes from "prop-types";

type PropTypes = {
  appearance: string;
  children: string;
};

const classes = [];

const primaryStyle = (appearance: string) => {
  if (appearance.includes("primary")) return "bg-blue-600";
  if (appearance.includes("secondary")) return "bg-indigo-800";
};

const Button = ({ children, appearance }: PropTypes) => {
  return (
    <div>
      <button className={`${primaryStyle(appearance)} bg-blue-800 p-3`}>
        {children}
      </button>
      ;
    </div>
  );
};

Button.propTypes = {
  appearance: PropTypes.string,
  children: PropTypes.string,
};

Button.defaultProps = {
  appearance: "primary",
};

export default Button;
