type SaleStatus = "In Progress" | "Closed" | "Negotiation" | "Pending";
type SalesPriority = "High" | "Medium" | "Low";

export type SaleType = {
  customerName: string;
  dealValue: string;
  status: SaleStatus;
  contactDate: string;
  salesperson: string;
  priority: SalesPriority;
};