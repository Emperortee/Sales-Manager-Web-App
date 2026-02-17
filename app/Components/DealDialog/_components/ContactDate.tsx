"use client";

import * as React from "react"; // 7.5s (gzipped: 3s)
import { format } from "date-fns"; // 19.5s (gzipped: 5.5s)
import { CalendarIcon } from "lucide-react"; // 3.4s (gzipped: 813)

import { MdError } from "react-icons/md"; // 3s (gzipped: 1.3s)
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { useSalesStore } from "@/app/useSaleStore";

export function ContactDatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const {
     setValue,
     clearErrors,
     formState: { errors },
} = useFormContext();

 const { selectedSale } = useSalesStore();

const handleDateChange = (selectedDate: Date |  undefined) => {
setDate(selectedDate);
setValue("contactDate", selectedDate);

if (selectedDate) {
   clearErrors("contactDate");
}
};

React.useEffect(() => {
console.log(date);

if (selectedSale) {
  const saleDate = new Date(selectedSale.contactDate);
  setDate(saleDate); // Update the local state
  setValue("contactDate", saleDate); // update the form value
} else {
setValue("contactDate", date);  // Ensure the default date is set in the form
}
clearErrors("contactDate"); //Clear any errors related to the date
}, []);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-slate-600">{` Last Visit `}</Label>
      <Popover>
        <PopoverTrigger className="border" asChild>
          <Button
            variant={"outline"}
            className="border flex gap-1 items-center justify-start h-11"
          >
            <CalendarIcon className={`h[date && "text-slate-500")`} />
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="text-slate-500">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="rounded-md"
          />
        </PopoverContent>
      </Popover>
      {/* <div className="text-red-500 flex gap-1 items-center text-[13px]">
        <MdError />
        <p>Please select the date </p>
      </div> */}
    </div>
  );
}