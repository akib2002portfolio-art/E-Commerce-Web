import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({ meta: [{ title: "Reset password — BD Collections" }, { name: "description", content: "Reset your password." }] }),
  component: () => (
    <div className="container-luxe grid min-h-screen place-items-center py-24">
      <div className="w-full max-w-md">
        <h1 className="font-display text-5xl">Reset password.</h1>
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block"><span className="eyebrow">Email</span><input type="email" required className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" /></label>
          <button className="h-12 w-full bg-ink text-canvas text-xs uppercase tracking-[0.22em]">Send reset link</button>
          <p className="text-xs text-taupe"><Link to="/auth/login" className="text-ink underline">← Back to sign in</Link></p>
        </form>
      </div>
    </div>
  ),
});