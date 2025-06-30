import { useEffect } from "react";
import { Button } from "./button";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, children, size = "md" }) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-800/30 to-slate-900/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={`
              relative bg-white/95 backdrop-blur-xl rounded-3xl w-full ${sizeClasses[size]}
              shadow-2xl shadow-slate-900/10 border border-white/20
              overflow-hidden
            `}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-50/30 pointer-events-none" />

            {/* Header */}
            {title && (
              <div className="relative flex items-center justify-between p-6 pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
                    {title}
                  </h2>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-slate-300 to-transparent rounded-full" />
                </div>

                <Button size="icon" variant="ghost" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Body */}
            <div className={`relative px-6 ${title ? "pb-6" : "py-6"}`}>
              <div className="text-slate-700 leading-relaxed">{children}</div>
            </div>

            {/* Subtle bottom border */}
            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
