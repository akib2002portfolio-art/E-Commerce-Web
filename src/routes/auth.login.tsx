import { createFileRoute, Link } from "@tanstack/react-router";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Sign in — BD Collections" }, { name: "description", content: "Sign in to your account." }] }),
  component: () => (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:block"><PlaceholderImage label="Members" aspect="auto" tone="ink" className="!h-full !aspect-auto" /></div>
      <div className="flex flex-col justify-center px-8 py-24 md:px-20">
        <p className="eyebrow">Members</p>
        <h1 className="mt-3 font-display text-5xl">Welcome back.</h1>
        <form className="mt-10 max-w-sm space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block"><span className="eyebrow">Email</span><input type="email" required className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" /></label>
          <label className="block"><span className="eyebrow">Password</span><input type="password" required className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" /></label>
          <button className="h-12 w-full bg-ink text-canvas text-xs uppercase tracking-[0.22em] hover:bg-sienna">Sign in</button>
          <div className="flex justify-between text-xs text-taupe">
            <Link to="/auth/forgot" className="hover:text-ink">Forgot password?</Link>
            <Link to="/auth/register" className="hover:text-ink">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  ),
});