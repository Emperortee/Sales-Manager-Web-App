"use client";

import { Dispatch, SetStateAction } from "react"; // 0.2s (gzipped: 1.0s)
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { salesPeople } from "../DealDialog";

type selectedSalesPersonProps = {
  selectedSalesPerson: string;
  setSelectedSalesPerson: Dispatch<SetStateAction<string>>;
};

export function SalesPeople({
  selectedSalesPerson,
  setSelectedSalesPerson,
}: selectedSalesPersonProps) {
    return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">{` Sales person `}</Label>

      <Select
        value={selectedSalesPerson}
        onValueChange={(value) => setSelectedSalesPerson(value)}
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="select a sales person" />
        </SelectTrigger>
        <SelectContent className="poppins">
          {salesPeople.map((person) => (
            <SelectItem key={person} value={person}>
              {person}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}