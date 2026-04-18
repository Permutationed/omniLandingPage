import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

interface Props {
  eyebrow?: string;
  title?: string;
  description?: string;
  background?: "primary" | "secondary";
}

const STEP_NAMES = [
  "Protocol",
  "Site Select",
  "Recruitment",
  "Screening",
  "Treatment",
  "Data Lock",
  "Analysis",
];
const STEP_COUNT = STEP_NAMES.length;
const BAR_START = 0.15;
const BAR_END = 0.85;

export default function AnimatedDashboardSection({
  eyebrow = "Platform",
  title = "Automated data orchestration.",
  description = "Track every stage of clinical data analysis from a single interface. From raw and cleaned datasets to SDTM, ADaM, TLFs, DSUR, and IB, everything stays visible, versioned, and reviewable.",
  background = "primary",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Progress bar width, animates over a wider range so the user sees movement
  const barWidth = useTransform(
    scrollYProgress,
    [BAR_START, BAR_END],
    ["0%", "100%"],
  );

  // Active step index
  const activeStep = useTransform(scrollYProgress, (p: number): number => {
    if (p < BAR_START) return -1;
    const normalized = (p - BAR_START) / (BAR_END - BAR_START);
    return Math.min(STEP_COUNT - 1, Math.floor(normalized * STEP_COUNT));
  });

  // Screening percentage (step index 3)
  const stepSize = (BAR_END - BAR_START) / STEP_COUNT;
  const screenStart = BAR_START + 3 * stepSize;
  const screenEnd = screenStart + stepSize;
  const screeningPct = useTransform(
    scrollYProgress,
    [screenStart, screenEnd],
    [0, 100],
  );

  const bg =
    background === "secondary"
      ? "bg-ploy-neutral-primary-s2"
      : "bg-ploy-background-primary";

  return (
    <section
      ref={sectionRef}
      className={`animated-dashboard relative border-b border-ploy-border-primary ${bg}`}
      style={{ height: "300vh" }}
    >
      <div className="animated-dashboard__pin sticky top-0 h-screen flex items-center">
        <div className="animated-dashboard__container max-w-7xl mx-auto w-full px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: heading */}
          <div className="animated-dashboard__content">
            {eyebrow && (
              <p className="animated-dashboard__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
                {eyebrow}
              </p>
            )}
            <h2 className="animated-dashboard__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.05] text-3xl md:text-4xl lg:text-5xl text-balance">
              {title}
            </h2>
            {description && (
              <p className="animated-dashboard__description text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-5 max-w-lg">
                {description}
              </p>
            )}
          </div>

          {/* Right: animated dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="animated-dashboard__card border border-ploy-border-primary overflow-hidden rounded-[var(--radius-card)] shadow-2xl shadow-black/10 bg-ploy-neutral-primary-s0"
          >
            <div className="animated-dashboard__bar border-b border-ploy-border-primary bg-ploy-neutral-primary-s2 flex items-center gap-2 px-4 py-3">
              <span className="flex gap-1.5">
                <span className="bg-red-400/80 w-2 h-2 block rounded-full" />
                <span className="bg-amber-400/80 w-2 h-2 block rounded-full" />
                <span className="bg-green-400/80 w-2 h-2 block rounded-full" />
              </span>
              <span className="text-xs text-ploy-text-secondary ml-3">
                Astraea Trial Dashboard
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="bg-green-500 w-1.5 h-1.5 block rounded-full animate-pulse" />
                <span className="text-xs text-ploy-text-secondary">Live</span>
              </span>
            </div>

            <div className="animated-dashboard__body p-6">
              <div className="animated-dashboard__meta flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-ploy-text-secondary font-medium">
                    Study
                  </p>
                  <p className="text-sm font-heading font-semibold text-ploy-text-primary mt-0.5">
                    ASTR-202 · Phase II · Oncology
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-ploy-text-secondary font-medium">
                    Progress
                  </p>
                  <p className="text-sm font-heading font-semibold text-ploy-accent-primary mt-0.5">
                    On track
                  </p>
                </div>
              </div>
              <div className="animated-dashboard__progress bg-ploy-neutral-primary-s3 h-1.5 overflow-hidden rounded-full mb-6">
                <motion.div
                  className="bg-ploy-accent-primary h-full rounded-full"
                  style={{ width: barWidth }}
                />
              </div>
              <div className="animated-dashboard__phases flex flex-wrap gap-1.5">
                {STEP_NAMES.map((name, i) => (
                  <DashStep
                    key={name}
                    name={name}
                    index={i}
                    activeStep={activeStep}
                    screeningPct={i === 3 ? screeningPct : undefined}
                  />
                ))}
              </div>

              <div className="animated-dashboard__artifacts grid grid-cols-4 gap-2 mt-6">
                {[
                  "Protocol v3.1",
                  "SAP v1.4",
                  "aCRF",
                  "SDTM",
                  "ADaM",
                  "TLFs",
                  "Define-XML",
                  "CSR Draft",
                ].map((artifact, i) => (
                  <ArtifactTile
                    key={artifact}
                    label={artifact}
                    index={i}
                    activeStep={activeStep}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashStep({
  name,
  index,
  activeStep,
  screeningPct,
}: {
  name: string;
  index: number;
  activeStep: MotionValue<number>;
  screeningPct?: MotionValue<number>;
}) {
  const borderColor = useTransform(activeStep, (a: number): string => {
    if (index < a) return "var(--ploy-border-primary)";
    if (index === a) return "var(--ploy-accent-primary)";
    return "var(--ploy-border-primary)";
  });
  const textColor = useTransform(activeStep, (a: number): string => {
    if (index < a) return "var(--ploy-text-secondary)";
    if (index === a) return "var(--ploy-accent-primary)";
    return "var(--ploy-text-secondary)";
  });
  const bgColor = useTransform(activeStep, (a: number): string =>
    index === a
      ? "color-mix(in oklab, var(--ploy-accent-primary) 8%, transparent)"
      : "transparent",
  );

  // If screeningPct provided, compose a dynamic label
  const pctLabel = useTransform(
    [activeStep, screeningPct ?? activeStep] as MotionValue<number>[],
    ([a, pct]: number[]): string => {
      if (!screeningPct) return name;
      if (index < a) return name;
      if (index === a) {
        const rounded = Math.round(pct);
        return rounded >= 100 ? name : `${name} ${rounded}%`;
      }
      return name;
    },
  );

  return (
    <motion.span
      className="animated-dashboard__phase border text-xs font-medium px-3 py-1.5 rounded-[var(--radius-button)]"
      style={{
        borderColor,
        color: textColor,
        backgroundColor: bgColor,
      }}
    >
      <motion.span>{pctLabel}</motion.span>
    </motion.span>
  );
}

function ArtifactTile({
  label,
  index,
  activeStep,
}: {
  label: string;
  index: number;
  activeStep: MotionValue<number>;
}) {
  // Artifacts roughly unlock as the study progresses
  const unlocked = useTransform(activeStep, (a: number) => a >= index - 1);
  const opacity = useTransform(unlocked, (u) => (u ? 1 : 0.4));
  const borderStyle = useTransform(unlocked, (u) => (u ? "solid" : "dashed"));

  return (
    <motion.div
      className="animated-dashboard__artifact border border-ploy-border-primary text-xs text-ploy-text-primary font-medium px-2.5 py-2 rounded-[var(--radius-button)] text-center"
      style={{ opacity, borderStyle }}
    >
      {label}
    </motion.div>
  );
}
