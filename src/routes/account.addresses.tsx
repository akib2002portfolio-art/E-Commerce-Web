import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/addresses")({
  component: () => (
    <div>
      <h2 className="font-display text-3xl">Addresses</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {["Home", "Studio"].map((a) => (
          <div key={a} className="border border-hairline p-6 text-sm">
            <p className="eyebrow">{a}</p>
            <p className="mt-2">You<br />123 Example Street<br />San Francisco, CA 94103<br />United States</p>
            <div className="mt-4 flex gap-4 text-xs uppercase tracking-[0.2em] text-taupe"><button className="hover:text-ink">Edit</button><button className="hover:text-ink">Remove</button></div>
          </div>
        ))}
      </div>
      <button className="mt-6 border border-ink px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-ink hover:text-canvas">Add address</button>
    </div>
  ),
});
