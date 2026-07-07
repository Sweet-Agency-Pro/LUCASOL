"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

/**
 * Menu déroulant custom : contrairement au <select> natif, le popup
 * d'options est entièrement stylé et reste lisible sur mobile.
 * Le menu est rendu dans un portail en position fixe, donc il passe
 * par-dessus les conteneurs avec overflow-hidden (cartes, tableaux…).
 */
export default function SelectMenu({
  value,
  options,
  onChange,
  buttonClassName = "",
  fullWidth = false,
}: {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  buttonClassName?: string;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const current = options.find((o) => o.value === value);

  const MENU_MAX_HEIGHT = 260;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!open && buttonRef.current) {
      setRect(buttonRef.current.getBoundingClientRect());
    }
    setOpen((o) => !o);
  };

  // Ouvre vers le haut s'il n'y a pas assez de place sous le bouton
  const openUpward =
    rect !== null &&
    rect.bottom + MENU_MAX_HEIGHT > window.innerHeight &&
    rect.top > MENU_MAX_HEIGHT;

  const menuStyle: React.CSSProperties = rect
    ? {
        position: "fixed",
        maxHeight: MENU_MAX_HEIGHT,
        ...(openUpward
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 }),
        ...(fullWidth
          ? { left: rect.left, width: rect.width }
          : {
              right: Math.max(8, window.innerWidth - rect.right),
              minWidth: "10rem",
            }),
      }
    : {};

  return (
    <div className={fullWidth ? "block" : "inline-block"}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        className={`inline-flex items-center gap-1.5 cursor-pointer ${fullWidth ? "w-full justify-between" : ""} ${buttonClassName}`}
      >
        <span className="truncate">{current?.label ?? "-"}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        rect &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            />
            <div
              style={menuStyle}
              className="z-50 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-100 py-1"
            >
              {options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-left text-neutral-dark hover:bg-gray-50 transition-colors"
                >
                  {o.label}
                  {o.value === value && (
                    <Check size={14} className="text-primary shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
