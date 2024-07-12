import clsx from "clsx";
import type { ReactNode } from "react";
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  color?: "primary" | "error" | "success" | "warning";
  size?: "xs" | "sm" | "md" | "lg";
  block?: boolean;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ghost?: boolean;
  className?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

interface ButtonReturn {
  borderColor: string;
  bgColor: string;
  textColor: string;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    type = "button",
    color = "primary",
    size = "md",
    block,
    onClick,
    disabled = false,
    ghost = false,
    className = "",
    iconStart,
    iconEnd,
  } = props;

  function getButtonStyle(): ButtonReturn {
    let borderColor = "border border-slate-300";
    let bgColor = "bg-white";
    let textColor = "text-white";

    if (disabled && !ghost) {
      bgColor = "bg-slate-300 cursor-not-allowed";
      textColor = "text-slate-400";
      return { borderColor, bgColor, textColor };
    }
    if (disabled && ghost) {
      bgColor = "bg-white";
      textColor = "text-slate-300";
      return { borderColor, bgColor, textColor };
    }

    let styleColor = "blue-500";
    if (color === "success") {
      styleColor = "teal-600";
    } else if (color === "error") {
      styleColor = "red-700";
    } else if (color === "warning") {
      styleColor = "amber-400";
    }

    borderColor = `border border-${styleColor}`;
    if (!ghost) {
      bgColor = `bg-${styleColor}`;
    } else {
      textColor = `text-${styleColor}`;
    }

    if (color === "warning" && !ghost) {
      textColor = `text-slate-900`;
    }

    return { borderColor, bgColor, textColor };
  }

  const { borderColor, bgColor, textColor } = getButtonStyle();

  return (
    <button
      type={type}
      className={clsx(
        "px-4 py-1 rounded flex justify-center items-center",
        className,
        borderColor,
        bgColor,
        textColor,
        `text-${size}`,
        {
          "text-base h-12": size === "md",
          "text-base h-14": size === "md",
          "text-base h-10": size === "sm",
          "w-full": block,
        }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {iconStart ? <span className="mr-2">{iconStart}</span> : null}
      {children}
      {iconEnd ? <span className="ml-2">{iconEnd}</span> : null}
    </button>
  );
}
