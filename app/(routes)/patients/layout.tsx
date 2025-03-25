import { Toaster } from "sonner";
import Navbar from "./Navbar";

export default function PatientsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Toaster position="top-right" />
    </div>
  );
}
