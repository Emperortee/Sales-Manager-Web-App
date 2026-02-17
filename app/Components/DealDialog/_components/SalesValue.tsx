import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdError } from "react-icons/md"; /* (aligned: 1.3k) */
import { useFormContext, Controller } from "react-hook-form"; 
import { NumericFormat } from "react-number-format"; 
import { TbCurrencyNaira } from "react-icons/tb";

export default function SaleValue() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-5 flex flex-col gap-2 relative">
      <Label htmlFor="customer-name" className="text-slate-600">
        {`Sale Value`}
      </Label>
      <Controller
        name="saleValue"
        control={control}
        defaultValue={""}
        render={({ field: { onChange, value, ...field } }) => (
          <NumericFormat
            {...field}
            value={value}
            customInput={Input}
            thousandSeparator
            placeholder="22,000..."
            className="h-11"
            decimalScale={2}
            allowNegative={false}
            onValueChange={(values) => {
              const { floatValue, value } = values;
              // if the input is empty (value is empty string)' pass empty string
              // otherwise pass the float value
              onChange(value === "" ? "" : floatValue ?? 0);
            }}
          />
        )}
      />
         
      {errors.saleValue && (
      <div className="text-red-500 flex gap-1 items-center text-[13px]">
        <MdError />
        <p>{errors.saleValue.message as string}</p>
      </div>
     )}
      <TbCurrencyNaira className="absolute right-3 top-9 text-primary" />
    </div>
  );
}