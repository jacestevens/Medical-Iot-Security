import PageIllustration from "@/components/page-illustration";

export const metadata = {
  title: "Sign In - MedixIT",
  description: "Sign in to your MedixIT account to access your dashboard and settings.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex grow flex-col">
      <PageIllustration multiple />

      {children}
    </main>
  );
}
