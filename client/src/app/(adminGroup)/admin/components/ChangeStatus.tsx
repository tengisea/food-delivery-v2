"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateData } from "@/hooks";
import useSWR from "swr";

const statuses = ["Delivered", "Pending", "Cancelled"];

export const ChangeDeliveryModal = ({
  open,
  onOpenChange,
  onSave,
  onChangeDeliveryState,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (status: string) => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const { data, error, isLoading } = useSWR(
    `${process.env.BACKEND}/food-order`,
    updateData
  );

  const orders = data?.allOrders || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change delivery state</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 justify-center">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "destructive" : "outline"}
              onClick={() => setSelectedStatus(status)}
              className="rounded-full">
              {status}
            </Button>
          ))}
        </div>

        <DialogFooter>
          <Button
            className="w-full mt-4"
            onClick={(() => onSave(selectedStatus,onChangeDeliveryState))}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
