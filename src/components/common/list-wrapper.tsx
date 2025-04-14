import { Card } from "../ui/card";

export default function ListWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Card className="bg-card text-card-foreground">{children}</Card>;
}
