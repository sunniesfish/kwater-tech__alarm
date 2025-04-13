import { Card } from "../ui/card";

export default function ListWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Card>{children}</Card>;
}
