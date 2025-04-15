"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import React from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    question: "How do I cancel my subscription?",
    answer:
      'You can cancel your subscription at any time by clicking on "Manage subscription".',
  },
  {
    question: "Can I pause my subscription?",
    answer:
      "Currently, subscriptions cannot be paused. You can cancel and resubscribe anytime.",
  },
  {
    question: "Will I get a refund if I cancel?",
    answer: "Refunds depend on your billing cycle and our refund policy.",
  },
  {
    question: "How do I change my email address?",
    answer: "Go to settings and update your email address under account info.",
  },
  {
    question: "Is there a student discount available?",
    answer: "Yes! Contact support with valid student ID to get a 20% discount.",
  },
  {
    question: "Do you offer team plans?",
    answer:
      "Absolutely! Check out our pricing page for team and enterprise options.",
  },
];

export default function FaqSection() {
  return (
    <div className="p-4 w-full  lg:px-[9vw]  ">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8">
        Frequently Asked Questions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {faqData.map((faq, idx) => (
          <Accordion.Root type="single" collapsible key={idx}>
            <Accordion.Item
              value="item-1"
              className="border border-zinc-800 rounded-xl overflow-hidden bg-[0F0F0F] text-[#9B9FA4] "
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-left text-sm sm:text-[14px] font-light transition hover:bg-zinc-800">
                  {faq.question}
                  <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4 text-sm text-zinc-300">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        ))}
      </div>
    </div>
  );
}
