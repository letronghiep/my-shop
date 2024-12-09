"use client";

import { DownOutlined } from "@ant-design/icons";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

interface SelectInputProps {
  data: string[];
  // className?: string;
  id: string;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  value: string;
  setValue: (value: string) => void;
}

function SelectInput({
  data,
  id,
  activeId,
  setActiveId,
  value,
  setValue,
}: SelectInputProps) {
  const isOpen = activeId === id;
  const toggleDropdown = () => {
    if (isOpen) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };
  const ref = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedValueRef = useRef<HTMLDivElement>(null);
  const [offsetTop, setOffsetTop] = useState(0);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isOpen) {
          setActiveId(null);
        }
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setActiveId, isOpen]);
  const updateOffsetTop = useCallback(() => {
    if (activeId === id && selectRef.current && ref.current) {
      const selectHeight = selectRef.current.getBoundingClientRect().height;
      const selectTop = selectRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const refParent = ref.current.getBoundingClientRect();
      const spaceBelow = windowHeight - selectTop - selectHeight;
      if (spaceBelow >= 0) {
        setOffsetTop(refParent.height);
      } else {
        setOffsetTop(-selectHeight);
      }
    }
  }, [activeId, id]);
  useEffect(() => {
    if (isOpen) {
      updateOffsetTop();
    }
  }, [isOpen, updateOffsetTop]);
  useEffect(() => {
    if (value && selectedValueRef.current) {
      selectedValueRef.current.innerHTML = value;
    }
  }, [value, selectedValueRef]);
  useEffect(() => {
    let timeout: any;
    const handleScroll = () => {
      timeout = setTimeout(() => {
        updateOffsetTop();
      }, 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateOffsetTop]);
  useEffect(() => {
    if (selectRef.current) {
      if (isOpen) {
        selectRef.current.style.top = `${offsetTop}px`;
      } else {
        selectRef.current.style.top = `${
          selectRef.current.getBoundingClientRect().top
        }px`;
      }
    }
  }, [isOpen, offsetTop]);

  const handleSelectValue = (e: MouseEvent<HTMLDivElement>) => {
    setValue(e.currentTarget.innerHTML);
    setActiveId(null);
  };
  return (
    <div ref={ref} className="w-full relative">
      <div
        className="w-full border px-3 py-2 relative"
        onClick={toggleDropdown}
      >
        <div ref={selectedValueRef} className="h-[20px]"></div>
        <DownOutlined
          className={`absolute right-3 top-1/2 transform transition-transform duration-300 ease-linear -translate-y-1/2 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        ref={selectRef}
        className={`overflow-auto absolute left-0 right-0 bg-white duration-300 ease-in-out ${
          isOpen ? "max-h-56" : "max-h-56 hidden"
        }`}
      >
        {data.map((item) => (
          <div
            key={item}
            className="px-3 py-2 text-sm overflow-auto cursor-pointer hover:bg-neutral-100 focus:bg-neutral-200 transition-colors duration-200 ease-in-out"
            onClick={handleSelectValue}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectInput;
