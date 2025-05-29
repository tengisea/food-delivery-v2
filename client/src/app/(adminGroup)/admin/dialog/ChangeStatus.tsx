"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const statuses = ["Delivered", "Pending", "Cancelled"];

export const ChangeDeliveryModal = ({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (status: string) => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  useEffect(() => {
    if (open) {
      setSelectedStatus("Pending");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change delivery status</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 justify-center">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "destructive" : "outline"}
              onClick={() => setSelectedStatus(status)}
              className="rounded-full"
            >
              {status}
            </Button>
          ))}
        </div>

        <DialogFooter>
          <Button className="w-full mt-4" onClick={() => onSave(selectedStatus)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
