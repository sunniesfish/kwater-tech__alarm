import { DialogTitle } from "@radix-ui/react-dialog";
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
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
