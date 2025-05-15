"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type ArrowButtonProps = {
  children: string;
  href?: string;
  onClick?: () => void;
  type: "left" | "right";
};

const AnimatedArrow = ({ direction, isHovered }: { direction: "left" | "right"; isHovered: boolean }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  
  const variants = {
  hidden: {
    opacity: 0,
    x: direction === "left" ? 80 : -80, // larger distance
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2, // slower animation
      ease: "easeOut",
    },
  },
};

  const className = `${
    direction === "left" ? "mr-3" : "ml-3"
  } w-40 h-5 ${isHovered ? "text-white" : "text-black"}`;

  const points =
    direction === "left"
      ? "200,10 10,10 15,5 0,10 15,15 10,10"
      : "0,10 190,10 185,5 200,10 185,15 190,10";

  return (
    <motion.svg
      ref={ref}
      className={className}
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate={controls}
      variants={variants}
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
};

import { useState } from "react";

export default function ArrowButton({ children, href, onClick, type }: ArrowButtonProps) {
  const [hovered, setHovered] = useState(false);

  const buttonContent = (
    <h1
      className={`flex gap-6 items-center border px-8 py-4 cursor-pointer transition-colors duration-300 ${
        hovered ? "bg-black text-white" : "bg-transparent text-black"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {type === "left" && <AnimatedArrow direction="left" isHovered={hovered} />}
      <span className="text-xl">{children}</span>
      {type === "right" && <AnimatedArrow direction="right" isHovered={hovered} />}
    </h1>
  );

  return href ? (
    <Link href={href}>{buttonContent}</Link>
  ) : (
    <button onClick={onClick}>{buttonContent}</button>
  );
}
