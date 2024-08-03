import DashboardNavbar from "@/components/DashboardNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-full flex-none md:w-32">
        <DashboardNavbar />
      </div>
      <div className="flex-1 p-4 overflow-y-auto">{children}</div>
    </div>
  );
}
