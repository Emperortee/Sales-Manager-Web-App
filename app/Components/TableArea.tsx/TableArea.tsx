"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import PaginationArea from "./Pagination/PaginationArea";
import { salesColumns } from "./SalesColumn";
// import { SalesTable } from "./SalesTable";
import { salesData } from "@/app/sales-data";

import {
  //ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"; // 52.7s (gzipped: 13.2k)

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableArea({ searchQuery }: { searchQuery: string }) {
  const tabItems = [
    { value: "all", label: "All Deals", count: salesData.length },
    { 
        value: "high", 
        label: "High Priority", 
        count: salesData.filter((d) => d.priority === "High").length,
    },
    { 
        value: "medium", 
        label: "Medium Priority", 
        count: salesData.filter((d) => d.priority === "Medium").length,
    },
    { 
        value: "low", 
        label: "Low Priority", 
        count: salesData.filter((d) => d.priority === "Low").length,
    },
  ];

  const [activeTab, setActiveTab] = useState("all");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

// Filter data based on the active tab
const filteredData = useMemo(() => {
  if (activeTab === "all") return salesData;
  return salesData.filter(
    (data) => data.priority.toLowerCase() === activeTab
  );
}, [activeTab]);

const table = useReactTable({
  data: filteredData,
  columns: salesColumns,
  getCoreRowModel: getCoreRowModel(),

  onColumnFiltersChange: setColumnFilters,
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    columnFilters,
  },
});

useEffect(() => {
  table.getColumn("customerName")?.setFilterValue(searchQuery); // Assuming the column key for search is "name"
}, [searchQuery, table]);


  return (
    <Card className="m-6 shadow-none overflow-hidden">
      <div className="p-8">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="mb-6 w-full"
        >
          <div className="flex items-center justify-between mb-4 max-md:flex-col max-lg:gap-2 max-sm:items-start">
            <TabsList className="h-10 max-sm:flex max-sm:flex-col max-sm:h-[132px] max-sm:w-full">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 h-8 rounded-md transition-all ${
                    activeTab === tab.value
                      ? 'bg-primary text-white max-sm:w-full'
                      : 'text-gray-600'
                  }"
                  onClick={() => setActiveTab(tab.value)}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`size-5 rounded-full ${
                      activeTab === tab.value ? "text-primary" : "text-gray-500"
                    } text-[11px]`}
                  >
                    {tab.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <Button className="flex items-center gap-2 max-lg:w-full max-sm:mt-4">
              <HiOutlineDocumentDownload className="size-4" />
              <span>Download as CSV/json</span>
            </Button>
          </div>

          {tabItems.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="w-full mt-9"
            >
              {activeTab === tab.value && (
                //table
                  <span>
                    <div className="rounded-md border overflow-hidden">
                        <Table>
  <TableHeader className="bg-gray-50 overflow-hidden">
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow className="h-10" key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
            return(
          <TableHead key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
          </TableHead>
            );
})}
      </TableRow>
    ))}
  </TableHeader>
  <TableBody>
    {table.getRowModel().rows?.length ? (
      table.getRowModel().rows.map((row) => (
        <TableRow
          className="h-12"
          key={row.id}
          data-state={row.getIsSelected() && "selected"}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell
          colSpan={table.getAllColumns().length}
          className="h-24 text-center"
        >
          No results.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>
                    </div>
                    
                  </span>
               
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {/* pagination area */}
      <PaginationArea/>
    </Card>
  );
}