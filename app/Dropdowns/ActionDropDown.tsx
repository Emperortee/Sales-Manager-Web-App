import { MdContentCopy, MdOutlineDelete } from "react-icons/md";
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
import { Row } from "@tanstack/react-table";
import { SaleType } from "../types";
import { useSalesStore } from "../useSaleStore";
import { useToast } from "@/hooks/use-toast";

export default function ActionDropdown({ row }: { row: Row<SaleType> }) {
  const { setOpenDeleteDialog, setSelectedSale, setOpenDealDialog } = useSalesStore();
  const { toast } = useToast();

  const menuItems = [
    { icon: <MdContentCopy />, label: "Copy", className: "" },
    { icon: <FaRegEdit />, label: "Edit", className: "" },
    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Delete",
      className: "text-red-600",
    },
  ];

  async function handleClickedItem(item: string) {
    if (item === "Copy") {
      const sale = row.original;
      const textToCopy = `Customer: ${sale.customerName}
Deal Value: ${sale.dealValue}
Status: ${sale.status}
Contact Date: ${sale.contactDate}
Sales Person: ${sale.salesperson}
Priority: ${sale.priority}`;

      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied!",
        description: `${sale.customerName}'s sale details have been copied to clipboard.`,
      });
    }

    if (item === "Edit") {
      setSelectedSale(row.original);
      setOpenDealDialog(true);
    }

    if (item === "Delete") {
      setSelectedSale(row.original);
      setOpenDeleteDialog(true);
    }
  }

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
            onClick={() => {
              handleClickedItem(item.label);
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}