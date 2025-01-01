import React from "react";

const HideFilterButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-500 text-white px-1 py-1 rounded-md shadow-md hover:bg-blue-600"
  >
    {`<`}
  </button>
);

export default HideFilterButton;
