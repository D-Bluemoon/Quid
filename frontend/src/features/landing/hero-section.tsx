"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import SignUpButton from "@/components/auth/SignUpButton";
import QuidLogo from "@/components/brand/QuidLogo";

const heroStats = [
  {
    value: "2.5k+",
    label: "Quests Completed",
  },
  { value: "120k+", label: "Verified Participants" },
  { value: "1.2M+", label: "Rewards Distributed" },
];

const cardSlides = [
  {
    title: "Download and test the latest Ruze.stellar 2.0",
    description:
      "Share your experiences with decentralized applications and help improve the ecosystem.",
    time: "~10 minutes",
    questions: "12",
    cta: "Take Quest",
    reward: "10 XLM",
  },
  {
    title: "Get community-verified insights fast",
    description:
      "Launch a gated survey and see verified responses from real Stellar users.",
    time: "~6 minutes",
    questions: "8",
    cta: "Create Quest",
    reward: "2.5k views",
  },
  {
    title: "Collect feedback on your next release",
    description:
      "Invite contributors, reward them, and ship with confidence in your roadmap.",
    time: "~14 minutes",
    questions: "16",
    cta: "Start Quest",
    reward: "24 XLM",
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
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

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSlide = useMemo(() => cardSlides[activeIndex], [activeIndex]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardSlides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [reduceMotion]);

  return (
    <section className="relative overflow-hidden pb-16 pt-8 text-foreground">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 md:max-w-3xl lg:max-w-7xl">
        {/* Navigation */}
        <motion.nav
          className="flex w-full items-center justify-between border-b-[3px] border-foreground pb-4 pt-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <QuidLogo />
            <div className="hidden h-6 w-[3px] bg-foreground md:block" />
            <div className="hidden items-center gap-6 text-sm font-bold uppercase tracking-wide md:flex">
              <motion.span className="cursor-pointer hover:text-brutal-violet">
                For Builders
              </motion.span>
              <motion.span className="cursor-pointer hover:text-brutal-pink">
                For Contributors
              </motion.span>
              <motion.span className="cursor-pointer hover:text-brutal-cyan">
                About
              </motion.span>
              <motion.span className="cursor-pointer hover:text-brutal-orange">
                Contact
              </motion.span>
            </div>
          </div>

          <SignUpButton
            variant="nav"
            className="hidden md:inline-flex cursor-pointer"
          />

          <motion.button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center brutal-border brutal-shadow bg-brutal-yellow md:hidden"
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open menu</span>
            <span className="flex flex-col gap-1">
              <span className="h-[3px] w-5 bg-foreground" />
              <span className="h-[3px] w-5 bg-foreground" />
              <span className="h-[3px] w-5 bg-foreground" />
            </span>
          </motion.button>
        </motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close menu"
                className="fixed inset-0 z-40 cursor-pointer bg-black/40 backdrop-blur-[1px] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                className="fixed right-4 top-4 z-50 w-[280px] brutal-border brutal-shadow bg-brutal-cyan p-6 text-foreground md:hidden"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Menu</div>
                  <motion.button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setMobileMenuOpen(false)}
                    className="cursor-pointer brutal-border p-2 text-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✕
                  </motion.button>
                </div>
                <div className="mt-6 flex flex-col gap-4 text-sm text-muted-foreground">
                  <motion.span
                    className="cursor-pointer hover:text-brutal-violet transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    For Builders
                  </motion.span>
                  <motion.span
                    className="cursor-pointer hover:text-brutal-violet transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    For Contributors
                  </motion.span>
                  <motion.span
                    className="cursor-pointer hover:text-brutal-violet transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    About
                  </motion.span>
                  <motion.span
                    className="cursor-pointer hover:text-brutal-violet transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    Contact us
                  </motion.span>
                </div>
                <SignUpButton
                  variant="nav"
                  className="mt-6 h-[44px] w-full text-sm"
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex flex-col gap-16 lg:my-[100px] lg:flex-row lg:items-center lg:justify-between">
          {/* Left Side */}
          <motion.div
            className="flex w-full flex-1 flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-6 cursor-default" variants={itemVariants}>
              <motion.h1
                className="text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]"
                variants={headingVariants}
              >
                Launch Better Stellar Products With{" "}
                <span className="bg-brutal-yellow px-2">Real User Insight</span>
              </motion.h1>
              <motion.p
                className="max-w-xl text-base font-medium text-muted-foreground sm:text-lg"
                variants={itemVariants}
              >
                Quid lets Stellar builders create gated feedback quests where
                real community members test early products, complete surveys,
                and earn rewards — all verified on-chain.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="h-11 min-w-[149px] cursor-pointer brutal-border brutal-shadow bg-brutal-pink px-5 text-sm font-bold uppercase tracking-wide text-foreground transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#0a0a0a]"
                whileTap={{ scale: 0.98 }}
              >
                Create a Quest
              </motion.button>
              <motion.button
                className="flex h-11 min-w-[158px] cursor-pointer items-center justify-center gap-2 brutal-border brutal-shadow bg-brutal-cyan px-4 text-sm font-bold uppercase tracking-wide text-foreground"
                whileTap={{ scale: 0.98 }}
              >
                Explore Quests
                <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <Image
                    src="/Arrow - Right.png"
                    alt="arrowright"
                    width={10}
                    height={10}
                    className="h-2 w-3"
                    priority
                  />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-10 my-[50px]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {heroStats.map((stat, idx) => (
                <motion.div
                  key={stat.value}
                  className="brutal-border brutal-shadow space-y-1 bg-card px-4 py-3"
                  style={{
                    backgroundColor:
                      idx === 0
                        ? "#FFE600"
                        : idx === 1
                          ? "#00E5FF"
                          : "#B8FF00",
                  }}
                  variants={statVariants}
                >
                  <p className="font-mono text-[28px] font-black leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Card Carousel */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[456px] flex-1 md:mx-auto lg:mx-0"
          >
            <div
              className="h-full w-full brutal-border brutal-shadow-lg bg-card p-6 lg:h-[433px]"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-full flex-col justify-between gap-[73.63px]"
                >
                  <div className="space-y-4 cursor-default">
                    <h3 className="text-2xl font-black uppercase leading-tight tracking-tight">
                      {activeSlide.title}
                    </h3>
                    <p className="text-base font-medium text-muted-foreground">
                      {activeSlide.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center justify-between w-full text-[1rem] mb-4">
                      <span>Time: {activeSlide.time}</span>
                      <span>Questions: {activeSlide.questions}</span>
                    </div>
                    <motion.button
                      className="flex h-14 w-full cursor-pointer items-center justify-between brutal-border brutal-shadow bg-brutal-lime px-4 text-base font-black uppercase text-foreground"
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{activeSlide.cta}</span>
                      <span className="text-sm font-black text-foreground">
                        {activeSlide.reward}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Indicators */}
            <motion.div
              className="flex justify-center gap-2 mt-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cardSlides.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`h-3 cursor-pointer border-[2px] border-foreground transition-all ${
                    idx === activeIndex ? "w-10 bg-brutal-orange" : "w-3 bg-muted"
                  }`}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
