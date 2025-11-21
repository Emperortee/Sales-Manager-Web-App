import { SaleType } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table"; // 29s (gzipped: 23B)
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import ActionDropdown from "@/app/Dropdowns/ActionDropDown";
import { format } from "date-fns"; 

export const salesColumns: ColumnDef<SaleType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pl-4">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="pl-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "dealValue",
    header: "Deal Value",  
    },
 
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
   
      return (
        <Badge
          className="rounded-xl bg-primary/15 text-primary font-normal select-none 
          shadow-none"
        >
          {row.original.status}
        </Badge>
      );
    },
  },
 
  {
    accessorKey: "contactDate",
    header: "Contact Date",
    cell: ({ row }) => {
      const contactDate = row.original.contactDate; // Access the raw date value
      const formattedDate = contactDate
        ? format(new Date(contactDate), "dd/MM/yyyy") // Format the date as desired
        : "N/A"; // Fallback if the date is not provided

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "salesperson",
    header: "Salesperson",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.original.priority; // Get the priority from the row data
      let priorityColor = "";

      if (priority === "Low") {
        priorityColor = "bg-green-500 text-white"; // Green for low priority
      } else if (priority === "Medium") {
        priorityColor = "bg-yellow-500 text-white"; // Yellow for medium priority
      } else if (priority === "High") {
        priorityColor = "bg-red-500 text-white"; // Red for high priority
      }

      return (
        <Badge
          className={`${priorityColor} font-semibold hover:bg-${priorityColor} shadow-none`}
        >
          {priority}
        </Badge>
      );
    },
  },
  {
      id: "actions",
    cell: ({ row }) => {
      return <ActionDropdown row={row} />;
    },
  },
];