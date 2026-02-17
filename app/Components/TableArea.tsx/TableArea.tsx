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
import { useSalesStore } from "@/app/useSaleStore";

import {
  //ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"; 

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface PaginationType {
  pageIndex: number;
  pageSize:number;
}

export default function TableArea({ searchQuery }: { searchQuery: string }) {
  const { allSales, loadAllSales } = useSalesStore();
  const tabItems = [
    { value: "all", label: "All Deals", count: allSales.length },
    { 
        value: "high", 
        label: "High Priority", 
        count: allSales.filter((d) => d.priority === "High").length,
    },
    { 
        value: "medium", 
        label: "Medium Priority", 
        count: allSales.filter((d) => d.priority === "Medium").length,
    },
    { 
        value: "low", 
        label: "Low Priority", 
        count: allSales.filter((d) => d.priority === "Low").length,
    },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting,setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 8,
  });

  useEffect(() => {
  loadAllSales();
}, []);

// Filter data based on the active tab
const filteredData = useMemo(() => {
  if (activeTab === "all") return allSales;
  return allSales.filter(
    (data) => data.priority.toLowerCase() === activeTab
  );
}, [activeTab, allSales]);

const table = useReactTable({
  data: filteredData,
  columns: salesColumns,
  getCoreRowModel: getCoreRowModel(),
  onSortingChange: setSorting,
  getSortedRowModel: getSortedRowModel(),
  onColumnFiltersChange: setColumnFilters,
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  state: {
    pagination,
    sorting,
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
                      ? 'bg-primary text-black max-sm:w-full'
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
      <PaginationArea
      table={table}
      pagination={pagination}
      setPagination={setPagination}/>
    </Card>
  );
}