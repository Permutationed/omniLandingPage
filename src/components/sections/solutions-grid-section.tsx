import { motion, type Variants } from "motion/react";

const SWOOP = [0.16, 1, 0.3, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: SWOOP, delay: 0.1 },
  },
};

const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: SWOOP, delay: 0.3 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: SWOOP, delay: 0.4 },
  },
};

interface Solution {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

interface Props {
  eyebrow?: string;
  title?: string;
  solutions?: Solution[];
}

function SolutionIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    spark: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      </svg>
    ),
    clipboard: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="12" height="17" rx="1" />
        <path d="M9 4V2h6v2M9 11h6M9 15h4" />
      </svg>
    ),
    team: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2.5" />
        <path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-3.5 4-3.5s2 1.5 2 3.5" />
      </svg>
    ),
  };
  return <>{icons[type] ?? icons.spark}</>;
}

const DEFAULT_SOLUTIONS: Solution[] = [
  {
    title: "Standards & Submission Automation",
    description: "Automate CRF annotation, SDTM/ADaM mapping, Define-XML, and TLF generation, three clicks from SAP to submission-ready package.",
    href: "/solutions/standards-automation",
    icon: <SolutionIcon type="spark" />,
  },
  {
    title: "End-to-End Biometrics",
    description: "Full-service biostatistics and programming from protocol design through NDA/BLA submission, inspection-ready deliverables, FDA and EMA aligned.",
    href: "/solutions/end-to-end-biometrics",
    icon: <SolutionIcon type="clipboard" />,
  },
  {
    title: "Embedded Biostatistics Teams",
    description: "Scalable FSP resourcing with AI-enhanced biostatisticians and programmers embedded in your SOPs, systems, and governance.",
    href: "/solutions/embedded-teams",
    icon: <SolutionIcon type="team" />,
  },
];

export default function SolutionsGridSection({
  eyebrow = "How We Help",
  title = "Solutions built for every stage of clinical development.",
  solutions = DEFAULT_SOLUTIONS,
}: Props) {
  return (
    <section id="solutions" className="solutions border-b border-ploy-border-primary py-24 lg:py-32 bg-ploy-neutral-primary-s2">
      <div className="solutions__container max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: SWOOP }}
          className="solutions__header text-center max-w-2xl mx-auto mb-14"
        >
          {eyebrow && (
            <p className="solutions__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="solutions__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
        </motion.div>
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="solutions__grid grid grid-cols-1 md:grid-cols-3 gap-px bg-ploy-border-primary border border-ploy-border-primary"
        >
          {solutions.map((solution) => (
            <motion.a
              key={solution.href}
              href={solution.href}
              variants={itemVariants}
              className="solutions__card group relative bg-ploy-background-primary p-8 lg:p-10 flex flex-col overflow-hidden transition-colors duration-300 hover:bg-ploy-neutral-primary-s0"
            >
              <span
                aria-hidden
                className="solutions__wash absolute inset-0 bg-gradient-to-b from-ploy-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
              <div className="solutions__card-inner relative flex flex-col grow">
                {solution.icon && (
                  <motion.div
                    variants={iconVariants}
                    className="solutions__icon text-ploy-accent-primary mb-5"
                  >
                    {solution.icon}
                  </motion.div>
                )}
                <motion.div
                  variants={ruleVariants}
                  style={{ originX: 0 }}
                  className="solutions__rule mb-5 h-[2px] w-10 bg-ploy-accent-primary"
                />
                <motion.h3
                  variants={textVariants}
                  className="solutions__card-title font-heading font-semibold text-xl text-ploy-text-primary"
                >
                  {solution.title}
                </motion.h3>
                <motion.p
                  variants={textVariants}
                  className="solutions__card-description text-ploy-text-secondary text-sm leading-relaxed mt-3 flex-grow"
                >
                  {solution.description}
                </motion.p>
                <motion.span
                  variants={textVariants}
                  className="solutions__card-cta text-sm text-ploy-accent-primary font-medium mt-6 inline-flex items-center gap-1 transition-all group-hover:gap-2"
                >
                  Learn more <span>→</span>
                </motion.span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
