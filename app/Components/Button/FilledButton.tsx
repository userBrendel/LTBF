"use client";

import Link from "next/link";

type FilledButtonProps = {
  children: string;
  href?: string;
  onClick?: () => void;
};

export default function FilledButton({
  children,
  href,
  onClick,
}: FilledButtonProps) {
  return href ? (
    <Link
      href={href}
      className="btn-wide inline-block py-2.5 px-6 text-m font-semibold !text-white bg-black border border-black hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
    >
      {children}
    </Link>
  ) : (
    <button
      className="btn-wide inline-block py-2.5 px-6 text-m font-semibold !text-white bg-black border border-black  hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
