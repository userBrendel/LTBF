"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type ArrowButtonProps = {
  children: string;
  href: string;
  onClick?: () => void;
  type: "left" | "right";
};

function AnimatedArrow({
  direction,
  isHovered,
}: {
  direction: "left" | "right";
  isHovered: boolean;
}) {
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isHovered, controls]);

  const variants = {
    hidden: {
      scaleX: 0,
      transformOrigin: direction === "left" ? "right center" : "left center",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    visible: {
      scaleX: 1,
      transformOrigin: direction === "left" ? "right center" : "left center",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const className = `${direction === "left" ? "mr-3" : "ml-3"} w-40 h-5 ${
    isHovered ? "text-white" : "text-black"
  }`;

  const points =
    direction === "left"
      ? "200,10 10,10 15,5 0,10 15,15 10,10"
      : "0,10 190,10 185,5 200,10 185,15 190,10";

  return (
    <motion.svg
      className={className}
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate={controls}
      variants={variants}
      display={"block"}
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

import { useState } from "react";

export default function ArrowButton({
  children,
  href,
  onClick,
  type,
}: ArrowButtonProps) {
  const [hovered, setHovered] = useState(false);

  const buttonContent = (
    <h1
      className={`flex p-4 items-center border cursor-pointer ${
        hovered ? "bg-black text-white" : "bg-transparent text-black"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {type === "left" && (
        <AnimatedArrow direction="left" isHovered={hovered} />
      )}
      <span className="text-xl">{children}</span>
      {type === "right" && (
        <AnimatedArrow direction="right" isHovered={hovered} />
      )}
    </h1>
  );

  return href ? (
    <Link href={href}>{buttonContent}</Link>
  ) : (
    <button onClick={onClick}>{buttonContent}</button>
  );
}
