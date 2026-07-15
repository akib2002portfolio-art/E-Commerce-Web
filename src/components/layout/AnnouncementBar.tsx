import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { announcements } from "@/data/promotions";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (announcements.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcements.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-ink text-canvas">
      <div className="container-luxe flex h-9 items-center justify-center overflow-hidden text-[0.68rem] uppercase tracking-[0.24em]">
        <AnimatePresence mode="wait">
          <motion.span
            key={announcements[index].id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {announcements[index].message}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}