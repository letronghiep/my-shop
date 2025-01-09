"use client";
import React from "react";

type Props = {
  onClick: () => void;
  Icon?: any;
  label: string;
};

function Anticon({ onClick, Icon, label }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-x-2 group cursor-pointer"
    >
      <Icon />
      <span className="transform transition-all duration-700 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:underline group-hover:text-black">
        {label}
      </span>
    </div>
  );
}

export default Anticon;
