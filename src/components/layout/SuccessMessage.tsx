type SuccessMessageProps = {
  children: React.ReactNode;
};

export default function SuccessMessage({ children }: SuccessMessageProps) {
  return <p className="text-green-500 font-bold">{children}</p>;
}
