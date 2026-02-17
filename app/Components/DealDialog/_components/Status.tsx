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

import { SaleStatus, SaleType } from "@/app/types";

type selectedStatusProps = {
  selectedStatus: SaleStatus;
  setSelectedStatus: Dispatch<SetStateAction<SaleStatus>>;
};

export function Status({
  selectedStatus,
  setSelectedStatus,
}: selectedStatusProps) {
  const statuses = ["In Progress", "Closed", "Negotiation", "Pending"];

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">{` Status `}</Label>

      <Select
        value={selectedStatus}
        onValueChange={(value) =>
          setSelectedStatus(value as SaleType["status"])
        }
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="select a diagnosis" />
        </SelectTrigger>
        <SelectContent className="poppins">
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}