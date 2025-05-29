"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type FilledButtonProps = {
  children: string;
  href?: string;
  size: string;
  onClick?: () => void;
};

const MotionButton = motion.button;
const MotionLink = motion.create(Link);

export default function FilledButton({
  children,
  href,
  size,
  onClick,
}: FilledButtonProps) {
  const commonProps = {
    whileHover: { scale: 1.05, boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.25)" },
    transition: { type: "spring", stiffness: 300, damping: 20 },
    className: `btn-wide inline-block py-2.5 px-6 text-${size} font-semibold !text-white bg-black border border-black text-center`,
  };

  return href ? (
    <MotionLink href={href} {...commonProps}>
      {children}
    </MotionLink>
  ) : (
    <MotionButton onClick={onClick} {...commonProps}>
      {children}
    </MotionButton>
  );
}
