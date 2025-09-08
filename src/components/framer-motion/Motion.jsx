"use client";
import React from "react";
import { motion, useScroll } from "framer-motion";

function Motion() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      id="scroll-indicator"
      style={{
        scaleX: scrollYProgress,
        position: "absolute",
        bottom: "-5px",
        left: 0,
        right: 0,
        height: "5px",
        originX: 0,
        overflow: "hidden",
        backgroundColor: "#adadad",
      }}
    />
  );
}

export default Motion;
