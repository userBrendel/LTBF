"use client";

import Link from "next/link";

type ArrowButtonProps = {
  children: string;
  href?: string;
  onClick?: () => void;
  type: "left" | "right";
};

const ArrowSVG = ({ direction }: { direction: "left" | "right" }) => {
  /* left arrow */
  if (direction === "left") {
    return (
      <svg
        className="w-40 h-5 text-black mr-3"
        viewBox="0 0 200 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="200,10 10,10 15,5 0,10 15,15 10,10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  /* right arrow */
  return (
    <svg
      className="w-40 h-5 text-black ml-3"
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points="0,10 190,10 185,5 200,10 185,15 190,10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function ArrowButton({
  children,
  href,
  onClick,
  type,
}: ArrowButtonProps) {
  const content = (
    <h1 className="flex gap-6 items-center border px-8 py-4">
      {type === "left" && <ArrowSVG direction="left" />}
      <span className="text-xl">{children}</span>
      {type === "right" && <ArrowSVG direction="right" />}
    </h1>
  );

  return href ? (
    <Link href={href}>{content}</Link>
  ) : (
    <button onClick={onClick}>{content}</button>
  );
}
