"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    id: "1",
    number: "01",
    title: "Browse the Category",
    description:
      "Explore topics that matter to you and discover surveys tailored to your interests.",
    image: "/step1.jpg",
    cta: "Click here to start",
  },
  {
    id: "2",
    number: "02",
    title: "Complete the Survey",
    description:
      "Share your thoughts by answering quick surveys and help shape ideas and products.",
    image: "/step2.jpg",
    cta: "Click here to start",
  },
  {
    id: "3",
    number: "03",
    title: "Get Rewarded",
    description: "Receive XLM rewards instantly",
    image: "/step3.jpg",
    cta: "Click here to start",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const HowItWorksSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <motion.section
      className="relative overflow-hidden px-4 py-16 text-foreground sm:px-6 sm:py-24 md:py-32 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div
        className="relative z-10 mx-auto mb-12 flex max-w-[700px] flex-col gap-2 text-center md:mb-16"
        variants={containerVariants}
      >
        <motion.span
          className="font-mono text-xs font-bold uppercase tracking-widest text-brutal-violet sm:text-sm"
          variants={headerVariants}
        >
          How It Works
        </motion.span>
        <motion.h2
          className="text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl"
          variants={headerVariants}
        >
          Have a Quest Setup in just 3 steps
        </motion.h2>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto mb-12 flex w-full max-w-6xl flex-col items-stretch justify-center gap-6 md:flex-row md:gap-8"
        variants={containerVariants}
      >
        {steps.map((step) => {
          const isExpanded = expandedId === step.id;

          return (
            <motion.div
              key={step.id}
              className="group relative min-h-[466px] flex-1 cursor-pointer overflow-hidden brutal-border brutal-shadow-lg"
              variants={cardVariants}
              onMouseEnter={() => setExpandedId(step.id)}
              onMouseLeave={() => setExpandedId(null)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${step.image}')` }}
              />
              <div className="absolute inset-0 bg-foreground/75 group-hover:bg-foreground/65 transition-opacity" />

              <div className="relative z-10 flex h-full flex-col justify-between p-8 text-background">
                {isExpanded ? (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black uppercase md:text-3xl">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-background/80">
                          {step.description}
                        </p>
                      </div>
                      <span className="text-7xl font-black text-background/20 md:text-8xl">
                        {step.number}
                      </span>
                    </div>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brutal-yellow"
                    >
                      {step.cta}
                      <span>→</span>
                    </a>
                  </>
                ) : (
                  <div className="flex flex-1 items-center justify-center">
                    <span className="text-8xl font-black text-background/25 md:text-9xl">
                      {step.number}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div className="relative z-10 flex justify-center" variants={cardVariants}>
        <button
          type="button"
          className="brutal-border brutal-shadow cursor-pointer bg-brutal-lime px-8 py-3 text-sm font-black uppercase tracking-wide text-foreground"
        >
          Explore Quests
        </button>
      </motion.div>
    </motion.section>
  );
};
