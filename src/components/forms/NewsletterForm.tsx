import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
        setTimeout(() => setDone(false), 3000);
      }}
      className="flex items-center gap-3 border-b border-canvas/30 pb-2"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full bg-transparent text-sm outline-none placeholder:text-canvas/40"
      />
      <button type="submit" aria-label="Subscribe" className="text-canvas transition-transform hover:translate-x-1">
        {done ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}