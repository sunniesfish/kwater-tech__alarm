import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "../ui/dialog";

export default function ModalWrapper({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="h-full">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
