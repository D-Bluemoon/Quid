"use client";

import { motion, Variants } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const faqData = [
  {
    question: "How do you ensure response quality?",
    answer:
      "We use multi-layer verification, attention checks, and quality scoring. Plus, our fair reward system motivates thoughtful participation from genuine users.",
  },
  {
    question: "Can I target specific demographics?",
    answer:
      "Yes, our platform offers advanced targeting options. You can filter respondents by age, location, profession, interests, and more.",
  },
  {
    question: "How quickly will I get responses?",
    answer:
      "Most campaigns start seeing results within minutes. Many users complete their data collection goals in under 24 hours.",
  },
  {
    question: "How much do I pay per Quest?",
    answer:
      "You have full control over your budget. Pricing is based on the number of responses you need and the complexity of your survey.",
  },
  {
    question: "What about data security and compliance?",
    answer:
      "All data is encrypted in transit and at rest. We are fully compliant with GDPR and other major privacy regulations.",
  },
  {
    question: "How does it work?",
    answer:
      "Create your survey or task, set your target audience and budget, and launch. Verified users complete your quest and you receive actionable data.",
  },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function FAQSection() {
  return (
    <section className="relative px-4 py-16 text-foreground sm:px-6 sm:py-24 md:py-32 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-12">
        <header className="flex w-full flex-col items-center gap-4 text-center">
          <h2 className="w-full text-3xl font-black uppercase tracking-tight md:text-5xl">
            Common Questions From Research Teams
          </h2>
          <p className="w-full text-base font-medium text-muted-foreground">
            Covers all the popular inquiries you may have.
          </p>
        </header>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-0"
          className="flex w-full flex-col gap-3"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={`faq-${index}`}
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
            >
              <AccordionItem
                value={`item-${index}`}
                className="brutal-border brutal-shadow w-full bg-card px-4 data-[state=open]:pb-2"
              >
                <AccordionTrigger className="py-4 hover:no-underline [&>svg]:text-foreground">
                  <h3 className="text-left text-base font-bold text-foreground md:text-lg">
                    {faq.question}
                  </h3>
                </AccordionTrigger>
                {faq.answer && (
                  <AccordionContent className="pb-4">
                    <div className="mb-3 h-[2px] w-full bg-foreground" />
                    <p className="text-sm font-medium leading-relaxed text-muted-foreground md:text-base">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                )}
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
