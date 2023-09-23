import React from "react";
import {
  DateRangePicker,
  DateRangePickerItem,
  // DateRangePickerValue,
} from "@tremor/react";
import { fr } from "date-fns/locale";
import Button from "./Button";

function CustomDateRangePicker({ onDateRangeChange }) {
  const [value, setValue] = React.useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateRangeChange = () => {
    onDateRangeChange(value);
  };

  return (
    <div className="flex space-x-2">
      <DateRangePicker
        className="max-w-md mx-auto"
        value={value}
        onValueChange={setValue}
        locale={fr}
        selectPlaceholder="Periode specifique"
      >
        <DateRangePickerItem
          key="quarter"
          value="quarter"
          from={
            new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1)
          }
          to={new Date()}
        >
          3 derniers mois
        </DateRangePickerItem>
        <DateRangePickerItem
          key="half"
          value="half"
          from={
            new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1)
          }
          to={new Date()}
        >
          6 derniers mois
        </DateRangePickerItem>
      </DateRangePicker>

      <Button event={() => handleDateRangeChange()}>Filtrer</Button>
    </div>
  );
}

export default CustomDateRangePicker;
