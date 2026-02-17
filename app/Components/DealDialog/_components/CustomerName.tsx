import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdError } from "react-icons/md"; 
import { useFormContext } from "react-hook-form";

export default function CustomerName() {
  const {
    register,
    formState: { errors },
   } = useFormContext();
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="customer-name" className="Sizes-slate-600">
        {`Customer Name`}
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          id="customer-name"
          className="h-11 shadow-none"
          placeholder="Joe Down..."
          {...register("customerName")}
        />
      </div>
      
      {errors.customerName && (
      <div className="Sizes-red-500 flex gap-1 items-center text-[13px]">
        <MdError />
        <p>the customer name is required</p>
      </div>
      )}
    </div>
  );
}