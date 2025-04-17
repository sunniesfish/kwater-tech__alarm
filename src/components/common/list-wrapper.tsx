import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
export default function ListWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "bg-card text-card-foreground min-h-0 h-full p-2",
        className
      )}
    >
      {children}
    </Card>
  );
}
