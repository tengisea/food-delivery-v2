"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export const AddCategoryDialog = ({ open, onClose, onSave }: AddCategoryDialogProps) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSave = () => {
    if (!categoryName) return;
    onSave(categoryName);
    setCategoryName("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Category</DialogTitle>
        </DialogHeader>
        <div className="text-lg font-semibold">Type category name...</div>
        <div className="py-1">
          <Input placeholder="Category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Add category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
