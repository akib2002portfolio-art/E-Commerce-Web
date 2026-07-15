import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/profile")({
  component: () => (
    <div>
      <h2 className="font-display text-3xl">Profile</h2>
      <form className="mt-6 max-w-lg space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label className="block"><span className="eyebrow">Name</span><input defaultValue="Your name" className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" /></label>
        <label className="block"><span className="eyebrow">Email</span><input type="email" defaultValue="you@example.com" className="mt-2 w-full border-b border-hairline bg-transparent py-3 outline-none focus:border-ink" /></label>
        <button className="h-12 bg-ink px-10 text-canvas text-xs uppercase tracking-[0.22em]">Save changes</button>
      </form>
    </div>
  ),
});
