// src/app/page.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Bot, ListChecks, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
      className="flex flex-col items-center text-center space-y-28 pt-16 pb-16"
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
          Stop Drowning in WhatsApp Chats. Start Closing Leads.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Ladder O Lead is the smart AI assistant that automatically extracts lead data from your WhatsApp conversations, so you never miss an opportunity again.
        </p>
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mt-8">
          <Button asChild size="lg" className="group">
            <Link href="/login">
              Start Your 1-Week Free Trial <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div id="features" variants={FADE_UP_ANIMATION_VARIANTS} className="w-full">
        <h2 className="text-3xl font-bold tracking-tight">Focus on Your Customers, Not on Data Entry</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { icon: <MessageSquare className="h-8 w-8 text-primary" />, title: "Automated Lead Capture", description: "Our AI reads your chats and automatically pulls names, numbers, and requirements." },
            { icon: <Bot className="h-8 w-8 text-primary" />, title: "Dual-Mode Operation", description: "Use our smart AI chatbot to reply instantly, or handle the conversation yourself." },
            { icon: <ListChecks className="h-8 w-8 text-primary" />, title: "Organized Dashboard", description: "See all your leads in one simple, clean dashboard. No more messy spreadsheets." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-[1px] rounded-lg bg-gradient-to-b from-border to-transparent"
            >
              <Card className="h-full bg-background/80 backdrop-blur-sm">
                <CardHeader className="items-center text-center">
                  {feature.icon}
                  <CardTitle className="mt-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-center">{feature.description}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}