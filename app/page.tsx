"use client";

import { Card } from "@/components/ui/card";
import Navbar from "./Components/Navbar";
import StatsCard from "./Components/StatsCard";
import TableArea from "./Components/TableArea.tsx/TableArea";
import { useState } from "react";
import { DeleteDialog } from "./Components/DeleteDialog";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="m-5 poppins">
      <DeleteDialog />
      <Card>
        <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <StatsCard />
        <TableArea searchQuery={searchQuery} />
      </Card>
    </div>
  );
}