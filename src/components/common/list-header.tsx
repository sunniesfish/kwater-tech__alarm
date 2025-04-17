export default function ListHeader({ title }: { title: string }) {
  return (
    <div className="flex h-10 ml-2 mt-1 justify-between items-center">
      <h2 className="text-base font-bold">{title}</h2>
    </div>
  );
}
