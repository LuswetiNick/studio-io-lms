import { Header } from "@/components/home/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
    </main>
  );
};
export default HomeLayout;
