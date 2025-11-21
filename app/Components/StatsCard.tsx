"use client";

import { Card } from "@/components/ui/card";
import React, { ReactNode } from "react";
import { GrMoney } from "react-icons/gr";
import { FaHandshake, FaChartLine } from "react-icons/fa";

type SingleCard = {
  title: string;
  value: string;
  icon: ReactNode;
};

export default function StatCards() {
  // Array of statistics cards
  const stats : SingleCard[] = [
    {
      title: "Total Sales",
      value: "$125,000",
      icon: <GrMoney />,
    },
    {
      title: "Deals in Progress",
      value: "45",
      icon: <FaHandshake />,
    },
    {
      title: "Conversion Rate",
      value: "67%",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 mt-7 gap-6 p-6">
      {stats.map((stat, index) => (
        <SingleStatCard key={index} SingleCard={stat} />
      ))}
    </div>
  );
}

function SingleStatCard({ SingleCard }: { SingleCard: SingleCard }) {
  return (
    <Card className="p-4 flex flex-col gap-2 shadow-none">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-600">
          {SingleCard.title}
        </span>
      </div>
      <div className="size-7 rounded-md flex items-center justify-center text-sm bg-primary/25 font-bold text-primary">
        {SingleCard.icon}
      </div>

      {/* Amount */}
      <div className="text-3xl font-bold">{SingleCard.value}</div>
    </Card>
  );
}