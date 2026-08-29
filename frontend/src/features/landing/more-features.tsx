"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { brutalBtnPrimary } from "@/lib/brutalist-classes";

const badges = [
  {
    text: "Get community-verified insights",
    className: "left-6 top-[-30px] px-5 py-4 w-[300px] bg-brutal-cyan",
  },
  {
    text: "Exportable feedback data",
    className: "right-[30px] top-[52%] -translate-y-1/2 px-5 py-4 w-[200px] bg-brutal-yellow",
  },
  {
    text: "Create quest-based surveys",
    className: "left-[-20px] bottom-[-10px] px-5 py-4 w-[300px] bg-brutal-lime",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

export default function MoreFeatures() {
  return (
    <section className="relative overflow-hidden pb-24 pt-12 text-foreground">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:max-w-3xl lg:max-w-6xl lg:flex-row lg:items-center">
        <motion.div
          className="relative w-full md:flex md:justify-center md:items-center lg:w-[45%]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="relative mx-auto h-[536px] w-full max-w-[373px] brutal-border brutal-shadow-lg overflow-hidden bg-card p-2"
            variants={imageVariants}
            whileHover={{ translate: "-2px -2px" }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/image.png"
              alt="Community feedback"
              width={373}
              height={536}
              className="h-full w-full object-cover -scale-x-100"
              priority
            />
          </motion.div>

          <motion.div
            className="hidden lg:block"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {badges.map((badge, idx) => (
              <motion.div
                key={badge.text}
                custom={idx}
                variants={badgeVariants}
                className={`absolute ${badge.className} brutal-border brutal-shadow text-sm font-bold uppercase tracking-wide text-foreground`}
              >
                {badge.text}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-4 flex flex-col items-center gap-3 lg:hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {badges.map((badge, idx) => (
              <motion.div
                key={badge.text}
                custom={idx}
                variants={badgeVariants}
                className={`w-full brutal-border brutal-shadow px-5 py-4 text-sm font-bold uppercase tracking-wide text-foreground ${badge.className.split(" ").find((c) => c.startsWith("bg-")) ?? "bg-brutal-cyan"}`}
              >
                {badge.text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full space-y-6 lg:w-[55%]"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-black uppercase leading-tight lg:text-5xl"
            variants={headingVariants}
          >
            Everything You Need to Run{" "}
            <span className="bg-brutal-yellow px-2">Community-Verified</span>{" "}
            Feedback Quests
          </motion.h2>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p className="text-base font-medium text-muted-foreground" variants={headingVariants}>
              Create stellar products using real feedback from real community users.
            </motion.p>
            <motion.p className="text-base text-muted-foreground" variants={headingVariants}>
              Quid helps Stellar creators validate ideas faster by turning their community
              into contributors. Create quests, gate access, collect structured feedback,
              and reward participants — all without friction.
            </motion.p>
          </motion.div>

          <motion.button
            className={brutalBtnPrimary}
            whileTap={{ scale: 0.98 }}
            variants={headingVariants}
          >
            Create a Quest
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
