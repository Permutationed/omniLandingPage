import { motion, type Variants } from "motion/react";

const SWOOP = [0.16, 1, 0.3, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

interface Module {
  name: string;
  description: string;
  icon?: React.ReactNode;
}

interface Props {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  modules?: Module[];
  cta?: { label: string; href: string };
}

function ModuleIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    standards: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    compliance: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    evidence: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
    stats: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M7 17V9M12 17V5M17 17v-6" />
      </svg>
    ),
  };
  return <>{icons[type] ?? icons.standards}</>;
}

const DEFAULT_MODULES: Module[] = [
  {
    name: "Astraea Standards",
    description: "Automated SDTM, ADaM, Define-XML, and aCRF generation. CDISC-native mapping with Pinnacle 21 validation baked in.",
    icon: <ModuleIcon type="standards" />,
  },
  {
    name: "Astraea Compliance",
    description: "Governed execution, data desensitization, and audit trails aligned with HIPAA, GDPR, 21 CFR Part 11, and FDA guidance.",
    icon: <ModuleIcon type="compliance" />,
  },
  {
    name: "Astraea Evidence",
    description: "Extracts and synthesizes evidence from protocols, SAPs, CSRs, and literature to support clinical and regulatory decisions.",
    icon: <ModuleIcon type="evidence" />,
  },
  {
    name: "Astraea Stats",
    description: "SAP-driven TLF generation with full traceability, validated statistical outputs wired into submission-ready packages.",
    icon: <ModuleIcon type="stats" />,
  },
];

export default function PlatformModulesSection({
  eyebrow = "Our Platform",
  title = "One platform. Four standards-native engines.",
  subtitle = "Astraea orchestrates specialized AI agents across the full biometrics lifecycle: standards mapping, compliance, evidence synthesis, and statistical execution. All in one controlled, audit-ready system.",
  modules = DEFAULT_MODULES,
  cta = { label: "Explore the Platform", href: "/platform" },
}: Props) {
  return (
    <section id="platform" className="modules border-b border-ploy-border-primary py-24 lg:py-32 bg-ploy-background-primary">
      <div className="modules__container max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: SWOOP }}
          className="modules__header text-center max-w-2xl mx-auto mb-14"
        >
          {eyebrow && (
            <p className="modules__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="modules__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="modules__subtitle text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-4">
              {subtitle}
            </p>
          )}
        </motion.div>
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="modules__grid grid grid-cols-1 md:grid-cols-2 gap-px bg-ploy-border-primary border border-ploy-border-primary"
        >
          {modules.map((mod) => (
            <motion.div
              key={mod.name}
              variants={itemVariants}
              className="modules__item group relative bg-ploy-background-primary p-8 lg:p-10 overflow-hidden"
            >
              <span
                aria-hidden
                className="modules__wash absolute inset-0 bg-gradient-to-b from-ploy-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
              <div className="modules__item-inner relative">
                {mod.icon && (
                  <motion.div
                    variants={iconVariants}
                    className="modules__icon text-ploy-accent-primary mb-5"
                  >
                    {mod.icon}
                  </motion.div>
                )}
                <motion.div
                  variants={ruleVariants}
                  style={{ originX: 0 }}
                  className="modules__rule mb-5 h-[2px] w-10 bg-ploy-accent-primary"
                />
                <motion.h3
                  variants={textVariants}
                  className="modules__name font-heading font-semibold text-xl text-ploy-text-primary"
                >
                  {mod.name}
                </motion.h3>
                <motion.p
                  variants={textVariants}
                  className="modules__description text-ploy-text-secondary text-sm leading-relaxed mt-3"
                >
                  {mod.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: SWOOP, delay: 0.2 }}
            className="modules__footer mt-12 text-center"
          >
            <a
              href={cta.href}
              className="modules__cta bg-ploy-button-primary-background text-ploy-button-primary-text border border-ploy-button-primary-border px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              {cta.label} <span>→</span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
