import { MdContentCopy, MdOutlineDelete } from "react-icons/md"; // 3.3s (gzipped: 1.4k)
import { FaRegEdit } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { MdMoreVert } from "react-icons/md"; 

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table"; // 28.5 (gzipped: 20k)
import { SaleType } from "../types";

export default function ActionDropdown({ row }: { row: Row<SaleType> }) {
  const menuItems = [
    { icon: <MdContentCopy />, label: "Copy", className: "" },
    { icon: <FaRegEdit />, label: "Edit", className: "" },
    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Delete",
      className: "text-red-600",
    },
  ];

  console.log(row);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MdMoreVert className="h-4 w-4 text-slate-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="popover">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className={`flex items-center gap-1 p-[8px] ${item.className}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}