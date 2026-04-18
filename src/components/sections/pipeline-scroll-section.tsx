import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { PipelineBlock } from "./pipeline-block";

interface Step {
  name: string;
  title: string;
  desc: string;
}

interface Props {
  eyebrow?: string;
  steps?: Step[];
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

const DEFAULT_STEPS: Step[] = [
  {
    name: "RAW INGESTION",
    title: "Raw Ingestion",
    desc: "Clinical data enters the pipeline from disparate sources. The ingestion layer normalizes formats and validates integrity before downstream processing.",
  },
  {
    name: "CDASH MAPPING",
    title: "CDASH Mapping",
    desc: "Raw clinical data is mapped to CDISC CDASH standards. AI-verified completeness checks eliminate weeks of manual annotation.",
  },
  {
    name: "SDTM GENERATION",
    title: "SDTM Generation",
    desc: "CDASH data is transformed into SDTM submission-ready datasets. Define.xml, reviewer guides, and validation reports generated with full traceability.",
  },
  {
    name: "ADaM TRANSFORMATION",
    title: "ADaM Transformation",
    desc: "SDTM datasets transformed into analysis-ready ADaM datasets. Derivation logic, population flags, and BDS/ADSL generation with automated QC.",
  },
  {
    name: "TLF PRODUCTION",
    title: "TLF Production",
    desc: "Analysis datasets feed into automated Tables, Listings, and Figures generation. Submission-ready TLFs with version control and audit trails.",
  },
];

const DEFAULT_FEATURES = [
  "Data refinement",
  "Standards generation",
  "Statistical execution",
  "Cross-track validation",
  "Report automation",
  "Full traceability",
];

interface StepAnimation {
  textOpacity: MotionValue<number>;
  blockOpacity: MotionValue<number>;
  blockY: MotionValue<number>;
  traceProgress: MotionValue<number>;
}

function useStepAnimation(
  scrollYProgress: MotionValue<number>,
  i: number,
  total: number,
): StepAnimation {
  const segment = 1 / total;
  const start = i * segment;
  const end = (i + 1) * segment;
  const traceStart = start + 0.03;

  const blockOpacity =
    i === 0
      ? useTransform(scrollYProgress, [0, 0], [1, 1])
      : useTransform(scrollYProgress, [start, start + 0.03], [0, 1]);

  const blockY =
    i === 0
      ? useTransform(scrollYProgress, [0, 0], [0, 0])
      : useTransform(scrollYProgress, [start, start + 0.06], [40, 0]);

  const traceProgress = useTransform(
    scrollYProgress,
    [traceStart, end - 0.02],
    [0, 1],
  );

  const textOpacity =
    i === 0
      ? useTransform(
          scrollYProgress,
          [0, 0.03, segment - 0.03, segment],
          [1, 1, 1, 0],
        )
      : useTransform(
          scrollYProgress,
          i === total - 1
            ? [Math.max(0, start - 0.01), start + 0.03, 1.0, 1.0]
            : [
                Math.max(0, start - 0.01),
                start + 0.03,
                end - 0.03,
                end,
              ],
          [0, 1, 1, i === total - 1 ? 1 : 0],
        );

  return { blockOpacity, blockY, traceProgress, textOpacity };
}

export default function PipelineScrollSection({
  eyebrow = "The Pipeline",
  steps = DEFAULT_STEPS,
  features = DEFAULT_FEATURES,
  ctaLabel = "Request a Demo",
  ctaHref = "https://cal.com/team/astraea/product-demo",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Pre-compute animations for each step at top level to preserve hook order
  const stepAnims = [
    useStepAnimation(scrollYProgress, 0, steps.length),
    useStepAnimation(scrollYProgress, 1, steps.length),
    useStepAnimation(scrollYProgress, 2, steps.length),
    useStepAnimation(scrollYProgress, 3, steps.length),
    useStepAnimation(scrollYProgress, 4, steps.length),
  ];

  // Active block index
  const activeIdx = useTransform(
    scrollYProgress,
    (p: number): number => Math.min(steps.length - 1, Math.floor(p * steps.length)),
  );

  return (
    <section
      ref={containerRef}
      className="pipeline-scroll relative border-b border-ploy-border-primary bg-ploy-background-primary"
      style={{ height: `${100 * steps.length}vh` }}
    >
      <div className="pipeline-scroll__pin sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="pipeline-scroll__container max-w-7xl mx-auto w-full px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: crossfading step text */}
          <div className="pipeline-scroll__text relative min-h-[22rem]">
            {eyebrow && (
              <p className="pipeline-scroll__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-6">
                {eyebrow}
              </p>
            )}
            <div className="pipeline-scroll__steps-text relative h-[18rem]">
              {steps.map((step, i) => (
                <motion.div
                  key={step.name}
                  className="pipeline-scroll__step-text absolute inset-0"
                  style={{ opacity: stepAnims[i]?.textOpacity }}
                >
                  <p className="pipeline-scroll__step-number uppercase tracking-[0.14em] text-xs text-ploy-accent-primary font-semibold mb-4">
                    Step {i + 1} of {steps.length}
                  </p>
                  <h2 className="pipeline-scroll__step-title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.05] text-3xl md:text-4xl lg:text-5xl text-balance">
                    {step.title}
                  </h2>
                  <p className="pipeline-scroll__step-desc text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-5 max-w-lg">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Features + CTA anchored below */}
            <div className="pipeline-scroll__footer mt-10 pt-8 border-t border-ploy-border-primary">
              <ul className="pipeline-scroll__features grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                {features.map((feat) => (
                  <li
                    key={feat}
                    className="pipeline-scroll__feature flex items-center gap-2 text-xs text-ploy-text-secondary"
                  >
                    <span className="pipeline-scroll__feature-dot w-1 h-1 bg-ploy-accent-primary rounded-full shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              {ctaLabel && ctaHref && (
                <a
                  href={ctaHref}
                  target={ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="pipeline-scroll__cta bg-ploy-button-primary-background text-ploy-button-primary-text border border-ploy-button-primary-border px-5 py-2.5 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {ctaLabel} <span>→</span>
                </a>
              )}
            </div>
          </div>

          {/* Right: stacking animated blocks */}
          <div className="pipeline-scroll__blocks flex flex-col items-center lg:items-end">
            <PipelineStack
              steps={steps}
              stepAnims={stepAnims}
              activeIdx={activeIdx}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineStack({
  steps,
  stepAnims,
  activeIdx,
}: {
  steps: Step[];
  stepAnims: StepAnimation[];
  activeIdx: MotionValue<number>;
}) {
  return (
    <div className="pipeline-stack flex flex-col">
      {steps.map((step, i) => {
        const anim = stepAnims[i];
        return (
          <motion.div
            key={step.name}
            style={{ opacity: anim?.blockOpacity, y: anim?.blockY }}
          >
            <PipelineBlockLiveWrapper
              name={step.name}
              index={i}
              activeIdx={activeIdx}
              traceProgress={anim?.traceProgress}
              isFirst={i === 0}
              total={steps.length}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function PipelineBlockLiveWrapper({
  name,
  index,
  activeIdx,
  traceProgress,
  isFirst,
  total,
}: {
  name: string;
  index: number;
  activeIdx: MotionValue<number>;
  traceProgress?: MotionValue<number>;
  isFirst: boolean;
  total: number;
}) {
  // Active / completed derived from scroll
  const isCompleted = useTransform(activeIdx, (a: number) => a > index).get();
  const isActive = useTransform(activeIdx, (a: number) => a === index).get();
  // We need these reactive; switch blocks on state change by re-reading every frame.
  // Use a small subscriber via useTransform to produce a single "stateKey"
  const stateKey = useTransform(activeIdx, (a: number): string => {
    if (a > index) return "completed";
    if (a === index) return "active";
    return "pending";
  });

  // Avoid re-instantiating PipelineBlock on each frame by reading once per render
  // and subscribing only to stateKey changes. Since useTransform.get() is non-reactive
  // in render, use useMotionValueEvent-like pattern.
  // Simpler: render all three states and toggle via opacity driven by stateKey.

  return (
    <PipelineBlockSwitcher
      name={name}
      isFirst={isFirst}
      stateKey={stateKey}
      traceProgress={traceProgress}
      total={total}
    />
  );
}

function PipelineBlockSwitcher({
  name,
  isFirst,
  stateKey,
  traceProgress,
}: {
  name: string;
  isFirst: boolean;
  stateKey: MotionValue<string>;
  traceProgress?: MotionValue<number>;
  total: number;
}) {
  const pendingOpacity = useTransform(stateKey, (s) =>
    s === "pending" ? 1 : 0,
  );
  const activeOpacity = useTransform(stateKey, (s) => (s === "active" ? 1 : 0));
  const completedOpacity = useTransform(stateKey, (s) =>
    s === "completed" ? 1 : 0,
  );

  return (
    <div className="pipeline-block-switcher relative">
      <motion.div style={{ opacity: pendingOpacity }} className="relative">
        <PipelineBlock
          name={name}
          isFirst={isFirst}
          isActive={false}
          isCompleted={false}
        />
      </motion.div>
      <motion.div
        style={{ opacity: activeOpacity }}
        className="absolute inset-0"
      >
        <PipelineBlock
          name={name}
          isFirst={isFirst}
          isActive
          isCompleted={false}
          progress={traceProgress}
        />
      </motion.div>
      <motion.div
        style={{ opacity: completedOpacity }}
        className="absolute inset-0"
      >
        <PipelineBlock
          name={name}
          isFirst={isFirst}
          isActive={false}
          isCompleted
        />
      </motion.div>
    </div>
  );
}
