"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SalePriority, SaleType } from "@/app/types";
import { SetStateAction, Dispatch } from "react";

type selectedPriorityProps = {
  selectedPriority: SalePriority;
  setSelectedPriority: Dispatch<SetStateAction<SalePriority>>;
};

export function Priority({
  selectedPriority, 
  setSelectedPriority,
}: selectedPriorityProps) {
  const priority: Array<SaleType["priority"]> = ["Low", "Medium", "High"];

  function renderBoxColor(priority: SaleType["priority"]) {
    switch (priority) {
      case "Low":
        return "bg-green-500";
      case "Medium":
        return "bg-orange-500";
      case "High":
        return "bg-red-500";
      default:
        return "bg-green-600";
    }
  }

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">Priority</Label>

      <Select
        value={selectedPriority}
        onValueChange={(value) => 
          setSelectedPriority(value as SaleType["priority"] )
        }
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="Select a priority" />
        </SelectTrigger>

        <SelectContent className="poppins">
          {priority.map((priority) => (
            <SelectItem key={priority} value={priority}>
              <div className="flex items-center gap-2">
                <div
              className={`w-4 h-4 rounded-full ${renderBoxColor(priority)}`}
            />

                <span>{priority}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
