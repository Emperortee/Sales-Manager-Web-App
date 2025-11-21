import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaginationSelection() {
  return (
    <div className="flex items-center gap-2 max-sm:flex-col">
      <span className="text-sm text-gray-500">Rows Per Page</span>
      <Select>
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder="5" />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 15, 20, 30].map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}