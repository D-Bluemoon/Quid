"use client";

import { motion, Variants } from "framer-motion";

const businessTags = [
  "Product design",
  "Market Strategy",
  "Brand Perception",
  "Market Research",
  "Competition Analysis",
  "Event Plan",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const labelVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    transition: { duration: 0.2 },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.8 },
  },
};

export default function BusinessCTASection() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/CTA background.jpg')",
        }}
      />

      {/* Dark Overlay — keeps CTA background image readable */}
      <div className="absolute inset-0 bg-foreground/85" />

      {/* Content Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32 gap-8 md:gap-10 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Label */}
        <motion.span
          className="font-mono text-xs font-bold uppercase tracking-widest text-brutal-yellow sm:text-sm"
          variants={labelVariants}
        >
          Business
        </motion.span>

        <motion.h2
          className="max-w-4xl text-3xl font-black uppercase leading-tight text-background sm:text-4xl md:text-5xl lg:text-6xl"
          variants={headingVariants}
        >
          Are you looking for user insights on your product?
        </motion.h2>

        {/* Tag Cloud */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {businessTags.map((tag) => (
            <motion.div
              key={tag}
              className="cursor-pointer brutal-border brutal-shadow bg-brutal-cyan px-4 py-2 md:px-5 md:py-2.5"
              variants={tagVariants}
              whileHover={{ translate: "-2px -2px" }}
            >
              <span className="text-sm font-bold uppercase tracking-wide text-foreground md:text-base">
                {tag}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Link */}
        <motion.a
          href="#"
          className="mt-8 flex items-center gap-2 text-base font-black uppercase tracking-wide text-brutal-yellow md:mt-12 md:text-lg"
          variants={ctaVariants}
        >
          Create a quest now
          <motion.span
            className="text-xl"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
