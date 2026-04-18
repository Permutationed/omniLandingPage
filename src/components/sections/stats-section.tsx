import { motion, type Variants } from "motion/react";

interface Stat {
  value: string;
  label: string;
  description: string;
}

interface Props {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  stats?: Stat[];
}

const DEFAULT_STATS: Stat[] = [
  { value: "30–50%", label: "Faster reporting cycles", description: "Compress the biometrics-to-reporting window in the workflows Astraea automates." },
  { value: "100%", label: "CDISC-ready outputs", description: "SDTM, ADaM, and Define-XML assets validated against submission conventions." },
  { value: "12–30", label: "Days off post-lock timelines", description: "Applied to a typical 40–60 business-day CSR cycle when Astraea is on the critical path." },
  { value: "100%", label: "Audit-ready by design", description: "Standards-native traceability, controlled execution, and human-in-the-loop approval baked into every workflow." },
];

const SWOOP = [0.16, 1, 0.3, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: SWOOP },
  },
};

const valueVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: SWOOP, delay: 0.1 },
  },
};

const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: SWOOP, delay: 0.35 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: SWOOP, delay: 0.45 },
  },
};

export default function StatsSection({
  eyebrow = "Measurable Impact",
  title = "Overcome your biggest clinical bottlenecks.",
  subtitle = "Astraea is built around the workflows regulators actually inspect, so every acceleration comes with traceability intact.",
  stats = DEFAULT_STATS,
}: Props) {
  return (
    <section className="stats border-b border-ploy-border-primary py-20 lg:py-28 bg-ploy-background-primary">
      <div className="stats__container max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: SWOOP }}
          className="stats__header text-center max-w-2xl mx-auto mb-14"
        >
          {eyebrow && (
            <p className="stats__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="stats__title font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-ploy-text-primary tracking-tight leading-[1.1] text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="stats__subtitle text-ploy-text-secondary text-base lg:text-lg mt-4 leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="stats__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ploy-border-primary border border-ploy-border-primary"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="stats__item group relative bg-ploy-background-primary p-8 lg:p-10 overflow-hidden"
            >
              {/* Subtle accent wash that fades in on hover */}
              <span
                aria-hidden
                className="stats__wash absolute inset-0 bg-gradient-to-b from-ploy-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              <div className="stats__item-inner relative">
                <motion.div
                  variants={valueVariants}
                  className="stats__value font-heading font-semibold text-ploy-accent-primary text-4xl lg:text-5xl tracking-tight leading-none"
                >
                  {stat.value}
                </motion.div>

                {/* Animated accent rule that draws in from left */}
                <motion.div
                  variants={ruleVariants}
                  style={{ originX: 0 }}
                  className="stats__rule mt-5 h-[2px] w-10 bg-ploy-accent-primary"
                />

                <motion.div
                  variants={textVariants}
                  className="stats__label mt-4 font-heading font-semibold text-ploy-text-primary text-lg"
                >
                  {stat.label}
                </motion.div>
                <motion.p
                  variants={textVariants}
                  className="stats__description text-ploy-text-secondary text-sm leading-relaxed mt-2"
                >
                  {stat.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
