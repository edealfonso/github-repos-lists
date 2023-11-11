export default function ErrorMessage({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <small className="text-error">{children}</small>;
}
