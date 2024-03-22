export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex flex-grow w-full justify-center">
        <div className="flex flex-col flex-grow max-w-4xl px-4 py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
