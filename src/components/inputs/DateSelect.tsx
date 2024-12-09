"use client";
import React, { useEffect, useId, useState } from "react";
import { MONTH, DAYS } from "@/constants/index";
import SelectInput from "./Select";
import { handleConvertDatetime } from "@/helpers";
type Props = {
  dataDate?: string;
  onApply: (selectedDate: { day: string; month: string; year: string }) => void;
};

function DateSelect({ dataDate, onApply }: Props) {
  const getYear = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    const startDate = currentYear - 100;
    for (let i = currentYear; i >= startDate; i--) {
      years.push(i.toString());
    }
    return years;
  };
  const dayId = useId();
  const monthId = useId();
  const yearId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  useEffect(() => {
    if (dataDate) {
      const { day, month, year } = handleConvertDatetime(dataDate);
      setDate(day.toString());
      setMonth("Tháng " + month.toString());
      setYear(year.toString());
    }
  }, [dataDate]);
  useEffect(() => {
    const normalizedMonth = month.replace("Tháng ", "");
    onApply({ day: date, month: normalizedMonth, year: year });
  }, [date, month, year]);
  return (
    <div className="w-full gap-x-3 flex items-center">
      <SelectInput
        value={date}
        setValue={setDate}
        id={dayId}
        activeId={activeId}
        setActiveId={setActiveId}
        data={DAYS}
      />
      <SelectInput
        value={month}
        setValue={setMonth}
        id={monthId}
        activeId={activeId}
        setActiveId={setActiveId}
        data={MONTH}
      />
      <SelectInput
        value={year}
        setValue={setYear}
        id={yearId}
        activeId={activeId}
        setActiveId={setActiveId}
        data={getYear()}
      />
    </div>
  );
}

export default DateSelect;
