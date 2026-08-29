"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { brutalCardColors } from "@/lib/brutalist";

const featureItems = [
  { title: "Custom Template", icon: "/Frame 56.png" },
  { title: "Diverse Audience", icon: "/Frame 57.png" },
  { title: "Cost Efficient", icon: "/Frame 58.png" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FeatureHighlights() {
  return (
    <section className="relative overflow-hidden py-24 text-foreground">
      <motion.div
        className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 pt-10 pb-30 text-center md:max-w-3xl lg:max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="max-w-3xl space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl font-black uppercase leading-tight lg:text-5xl"
            variants={headingVariants}
          >
            Save time. Work smarter. Get{" "}
            <span className="bg-brutal-cyan px-2">answers.</span>
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-base font-medium text-muted-foreground"
            variants={headingVariants}
          >
            From quick UX tests to in-depth interviews — real feedback, real
            quick.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid w-full max-w-3xl gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featureItems.map((feature, idx) => (
            <motion.div
              key={feature.title}
              className="brutal-border brutal-shadow flex flex-col items-center gap-4 bg-card p-6 text-center"
              style={{ backgroundColor: brutalCardColors[idx] }}
              variants={itemVariants}
              whileHover={{ translate: "-2px -2px" }}
            >
              <div className="brutal-border brutal-shadow flex h-20 w-20 items-center justify-center bg-card">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <p className="text-sm font-black uppercase tracking-wide">
                {feature.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
