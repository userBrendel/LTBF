type ErrorMessageProps = {
  children: React.ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className="text-red-500 font-bold">{children}</p>;
}
