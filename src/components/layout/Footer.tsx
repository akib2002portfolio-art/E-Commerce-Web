import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { footerConfig } from "@/data/footer";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

export function Footer() {
  const { company, columns, social, copyright } = footerConfig;

  return (
    <footer className="mt-24 border-t border-hairline bg-ink text-canvas">
      <div className="container-luxe grid gap-16 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl leading-tight">
            {company.name.split(" ")[0]} <span className="italic">{company.name.split(" ").slice(1).join(" ")}</span>
          </p>
          <p className="mt-4 max-w-sm text-sm text-canvas/70">{company.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-canvas/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{company.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span>{company.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <span>{company.email}</span>
            </li>
          </ul>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow !text-canvas/60">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="opacity-80 hover:opacity-100">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-canvas/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-xs text-canvas/60 md:flex-row">
          <p>{copyright}</p>
          <div className="flex items-center gap-4">
            {social.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:text-canvas">
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}