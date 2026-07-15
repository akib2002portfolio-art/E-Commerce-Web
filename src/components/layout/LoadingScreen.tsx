import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("bd-loaded") === "1") {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      setShow(false);
      window.sessionStorage.setItem("bd-loaded", "1");
    }, 1500);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink text-canvas"
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="font-display text-4xl">bd.<span className="italic">collections</span></p>
            <div className="mx-auto mt-6 h-px w-24 overflow-hidden bg-canvas/20">
              <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.3, ease: "easeInOut", repeat: Infinity }} className="h-full w-full bg-canvas" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}