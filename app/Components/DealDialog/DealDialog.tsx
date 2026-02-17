"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IoIosAdd } from "react-icons/io";

import { ContactDatePicker } from "./_components/ContactDate";
import CustomerName from "./_components/CustomerName";
import SaleValue from "./_components/SalesValue";
import { Status } from "./_components/Status";
import { Priority } from "./_components/Priority";
import { SalesPeople } from "./_components/SalesPeople";
import { SalePriority, SaleStatus, SaleType } from "@/app/types";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useSalesStore } from "@/app/useSaleStore";

export const salesPeople = [
  "Alice Smith",
  "Bob Johnson",
  "Sara Davis",
  "Tom Wilson",
  "Anna Taylor",
  "Chris Lee",
  "Emily Johnson",
];

const dialogSchema = z.object({
  contactDate: z
    .date()
    .refine((val) => val instanceof Date, {
      message: "Please select the date",
    }),

  customerName: z
    .string()
    .min(1, "The customer name is required"),

  saleValue: z
    .coerce
    .number()
    .min(0, "Sale value cannot be negative"),
});

type FormInput = z.input<typeof dialogSchema>;
type FormData = z.output<typeof dialogSchema>;

export default function SalesDialog() {
  const [selectedPriority, setSelectedPriority] = useState<SalePriority>("Low");
  const [selectedStatus, setSelectedStatus] = useState<SaleStatus>("In Progress");
  const [selectedSalesperson, setSelectedSalesperson] = useState(salesPeople[0]);

  const methods = useForm<FormInput, any, FormData>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      saleValue: 0,
      customerName: "",
    },
  });

  const {
    addSale,
    openDealDialog,
    setOpenDealDialog,
    selectedSale,
    setSelectedSale,
    updateSale,
  } = useSalesStore();
  
  const { toast } = useToast();

  const handleDialogClose = () => {
    // Reset form fields and custom state when dialog is closed
    methods.reset({
      saleValue: 0,
      customerName: "",
    });
    setSelectedPriority("Low");
    setSelectedStatus("In Progress");
    setSelectedSalesperson(salesPeople[0]);
    setSelectedSale(null);
    setOpenDealDialog(false);
  };

  useEffect(() => {
    if (openDealDialog && selectedSale) {
      // Populate form with selected sale data for editing
      methods.reset({
        customerName: selectedSale.customerName,
        contactDate: new Date(selectedSale.contactDate),
        saleValue: parseFloat(selectedSale.dealValue.replace(/[^0-9.-]/g, "")),
      });
      setSelectedPriority(selectedSale.priority);
      setSelectedStatus(selectedSale.status);
      setSelectedSalesperson(selectedSale.salesperson);
    } else if (openDealDialog && !selectedSale) {
      // Reset to defaults for new sale
      methods.reset({ 
        saleValue: 0, 
        customerName: "" 
      });
      setSelectedPriority("Low");
      setSelectedStatus("In Progress");
      setSelectedSalesperson(salesPeople[0]);
    }
  }, [openDealDialog, selectedSale, methods]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!selectedSale) {
      // Add new sale
      const newSale: SaleType = {
        id: nanoid(),
        priority: selectedPriority,
        salesperson: selectedSalesperson,
        status: selectedStatus,
        dealValue: data.saleValue.toString(),
        contactDate: data.contactDate.toDateString(),
        customerName: data.customerName,
      };

      const result = await addSale(newSale);

      const formattedSaleValue = data.saleValue.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
      });

      if (result) {
        toast({
          title: "Sale Added!",
          description: `The deal of ${formattedSaleValue} has been added successfully.`,
        });
      }
    } else {
      // Update existing sale
      const saleToUpdate: SaleType = {
        id: selectedSale.id,
        contactDate: data.contactDate.toDateString(),
        dealValue: data.saleValue.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        }),
        customerName: data.customerName,
        priority: selectedPriority,
        salesperson: selectedSalesperson,
        status: selectedStatus,
      };

      const result = await updateSale(saleToUpdate);

      if (result) {
        toast({
          title: "Sale Updated!",
          description: `The sale has been updated successfully.`,
        });
      }
    }

    handleDialogClose();
  };

  return (
    <Dialog 
      open={openDealDialog} 
      onOpenChange={(open) => {
        if (!open) {
          handleDialogClose();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button 
          onClick={() => {
            setSelectedSale(null);
            setOpenDealDialog(true);
          }} 
          className="h-8" 
          data-testid="add-sale-button"
        >
          <IoIosAdd className="text-3xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-7 px-8 poppins max-h-screen sm:max-h-[90vh] max-sm:w-full max-w-[800px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            {selectedSale ? "Edit Sale" : "New Sale"}
          </DialogTitle>
          <DialogDescription>
            Fill in the form to {selectedSale ? "edit the" : "add a new"} sale
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
              <CustomerName />
              <SaleValue />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5 max-sm:grid-cols-1">
              <Status
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
              <Priority
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5 max-sm:grid-cols-1">
              <ContactDatePicker />
              <SalesPeople
                selectedSalesPerson={selectedSalesperson}
                setSelectedSalesPerson={setSelectedSalesperson}
              />
            </div>

            <DialogFooter className="mt-11 mb-4 flex items-center gap-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={handleDialogClose}
                  variant={"secondary"}
                  className="h-11 px-11 max-sm:w-full"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" className="h-11 px-11 max-sm:w-full">
                {selectedSale ? "Edit Sale" : "Add Sale"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}