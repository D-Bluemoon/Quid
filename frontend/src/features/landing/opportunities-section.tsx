"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Clock } from "lucide-react";
import { brutalCardColors } from "@/lib/brutalist";

const opportunityCards = [
  {
    id: 1,
    title: "Web3 User Experience",
    description:
      "Share your experiences with decentralized applications and help improve the ecosystem.",
    time: "~15 min",
    questions: "8",
    reward: "10 XLM",
  },
  {
    id: 2,
    title: "Blockchain Usability",
    description:
      "Participate in user testing sessions for blockchain platforms and contribute to enhancing usability.",
    time: "~20 min",
    questions: "12",
    reward: "15 XLM",
  },
  {
    id: 3,
    title: "AI-Powered Chatbot Feedback",
    description:
      "Engage with an AI chatbot and share insights on its conversational abilities.",
    time: "~10 min",
    questions: "6",
    reward: "8 XLM",
  },
  {
    id: 4,
    title: "E-Commerce Experience",
    description:
      "Complete a survey focused on your recent online shopping experiences.",
    time: "~18 min",
    questions: "10",
    reward: "12 XLM",
  },
  {
    id: 5,
    title: "Mobile App Usability",
    description:
      "Test a new mobile app and provide feedback on its design and functionality.",
    time: "~15 min",
    questions: "9",
    reward: "11 XLM",
  },
  {
    id: 6,
    title: "Virtual Reality Interface",
    description:
      "Participate in testing a VR application and evaluate its user interface.",
    time: "~25 min",
    questions: "14",
    reward: "18 XLM",
  },
  {
    id: 7,
    title: "Health Tracking App",
    description:
      "Use a health tracking app and share your thoughts on features and layout.",
    time: "~12 min",
    questions: "7",
    reward: "9 XLM",
  },
  {
    id: 8,
    title: "Social Media Platform Feedback",
    description:
      "Explore new features in a social media platform and provide constructive feedback.",
    time: "~16 min",
    questions: "11",
    reward: "13 XLM",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function OpportunitiesSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-foreground">
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center gap-12 md:gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="flex w-full flex-col items-center gap-3 text-center"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl"
            variants={headerVariants}
          >
            Looking to earn money taking surveys?
          </motion.h2>
          <motion.h3
            className="text-2xl font-black uppercase text-brutal-violet sm:text-3xl"
            variants={headerVariants}
          >
            You&apos;ve come to the right place.
          </motion.h3>
          <motion.p
            className="mt-2 max-w-2xl text-base font-medium text-muted-foreground sm:text-lg"
            variants={headerVariants}
          >
            Discover feedback opportunities from leading companies. Complete tasks on
            your schedule and earn rewards directly to your wallet.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6"
          variants={containerVariants}
        >
          {opportunityCards.map((card, idx) => (
            <motion.div
              key={card.id}
              className="brutal-border brutal-shadow flex h-full flex-col bg-card"
              style={{ borderTopWidth: "6px", borderTopColor: brutalCardColors[idx % brutalCardColors.length] }}
              variants={cardVariants}
              whileHover={{ translate: "-3px -3px" }}
            >
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h4 className="text-lg font-black uppercase leading-snug text-foreground">
                  {card.title}
                </h4>
                <p className="flex-1 text-sm font-medium leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 border-t-[3px] border-foreground px-5 py-3 text-sm font-bold">
                <div className="flex items-center gap-1.5 text-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{card.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-foreground">
                  <Image src="/book.svg" alt="questions" width={16} height={16} className="h-4 w-4" />
                  <span>{card.questions} Q</span>
                </div>
                <div className="flex items-center gap-1.5 text-foreground">
                  <Image
                    src="/image 12 (1).svg"
                    alt="stellar"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                  <span>{card.reward}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="brutal-border brutal-shadow cursor-pointer bg-brutal-orange px-8 py-3 text-sm font-black uppercase tracking-wide text-foreground"
          whileTap={{ scale: 0.98 }}
          variants={cardVariants}
        >
          Explore Quests
        </motion.button>
      </motion.div>
    </section>
  );
}
