import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Create account — BD Collections" }, { name: "description", content: "Join the house." }] }),
  component: () => (
    <div className="container-luxe grid min-h-screen place-items-center py-24">
      <div className="w-full max-w-md">
        <p className="eyebrow">Join</p>
        <h1 className="mt-3 font-display text-5xl">Create an account.</h1>
        <p className="mt-3 text-taupe">Members receive 10% off first order and early access to drops.</p>
        <form className="mt-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block"><span className="eyebrow">Name</span><input required className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" /></label>
          <label className="block"><span className="eyebrow">Email</span><input type="email" required className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" /></label>
          <label className="block"><span className="eyebrow">Password</span><input type="password" required className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" /></label>
          <button className="h-12 w-full bg-ink text-canvas text-xs uppercase tracking-[0.22em] hover:bg-sienna">Create account</button>
          <p className="text-xs text-taupe">Already a member? <Link to="/auth/login" className="text-ink underline">Sign in</Link></p>
        </form>
      </div>
    </div>
  ),
});