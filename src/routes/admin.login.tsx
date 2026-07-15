import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLoginForm } from "@/features/admin/auth/components/AdminLoginForm";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Administrator Login — BD Collection CMS" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();

  return (
    <AdminLoginForm
      onSuccess={() => {
        const dashboardPath: string = "/admin/dashboard";
        navigate({ to: dashboardPath });
      }}
    />
  );
}