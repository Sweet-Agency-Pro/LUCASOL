"use client";

import { Award, Star, ThumbsUp } from "lucide-react";
import Container from "@/components/ui/Container";
import { STATS } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award size={28} />,
  Star: <Star size={28} />,
  ThumbsUp: <ThumbsUp size={28} />,
};

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericPart = value.replace(/[^0-9]/g, "");
    const suffix = value.replace(/[0-9]/g, "");
    const target = parseInt(numericPart, 10);

    if (isNaN(target)) {
      setDisplay(value);
      return;
    }

    let current = 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setDisplay(current + suffix);
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsSection() {
  return (
    <section className="bg-primary py-16">
      <Container>
        <div className="grid grid-cols-3 gap-6 sm:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center text-white"
            >
              <div className="flex justify-center mb-3 opacity-80">
                {iconMap[stat.icon]}
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
                <AnimatedValue value={stat.value} />
              </div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
