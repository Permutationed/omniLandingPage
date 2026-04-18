import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface Discipline {
  number: string;
  label: string;
  heading: string;
  body: string;
  videoSrc: string;
  imageRight?: boolean;
}

interface Props {
  eyebrow?: string;
  title?: string;
  disciplines?: Discipline[];
  background?: "primary" | "secondary";
}

const DEFAULT_DISCIPLINES: Discipline[] = [
  {
    number: "01",
    label: "Protocol Design",
    heading: "Human oversight for data analysis at AI speed.",
    body: "Reduce data analysis and QC time by up to 90% while keeping experts in control of every critical decision. Reviewers see what Astraea did, why, and what to approve next.",
    videoSrc: "/demo-1.mp4",
    imageRight: true,
  },
  {
    number: "02",
    label: "Data Management",
    heading: "Unified visibility across the clinical data stack.",
    body: "View, organize, and manage data across multiple sources, formats, and study assets in one workspace, with full lineage from raw capture through submission-ready outputs.",
    videoSrc: "/demo-2.mp4",
    imageRight: false,
  },
  {
    number: "03",
    label: "Analysis & Reporting",
    heading: "Automated SDTM and ADaM analysis with expert review built in.",
    body: "Move faster on clinical analysis and downstream outputs with automation that improves speed, consistency, and traceability, without cutting the biostatistician out of the loop.",
    videoSrc: "/demo-3.mp4",
    imageRight: true,
  },
];

export default function DisciplinesScrollSection({
  eyebrow = "The Platform in Action",
  title = "Built for speed, designed for compliance.",
  disciplines = DEFAULT_DISCIPLINES,
  background = "secondary",
}: Props) {
  const bg =
    background === "secondary"
      ? "bg-ploy-neutral-primary-s2"
      : "bg-ploy-background-primary";
  return (
    <section className={`disciplines-scroll border-b border-ploy-border-primary py-24 lg:py-32 overflow-x-hidden ${bg}`}>
      <div className="disciplines-scroll__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="disciplines-scroll__header max-w-2xl mb-20">
          {eyebrow && (
            <p className="disciplines-scroll__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="disciplines-scroll__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
              {title}
            </h2>
          )}
        </div>
        <div className="disciplines-scroll__rows space-y-24 lg:space-y-32">
          {disciplines.map((item) => (
            <DisciplineRow key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DisciplineRow({ item }: { item: Discipline }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 95%", "center 40%"],
  });

  const textX = useTransform(
    scrollYProgress,
    [0, 0.8],
    [item.imageRight ? -120 : 120, 0],
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.8],
    [item.imageRight ? 120 : -120, 0],
  );
  const imageOpacity = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);

  return (
    <div
      ref={rowRef}
      className="discipline-row grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      {/* Text side */}
      <motion.div
        style={{ x: textX, opacity: textOpacity }}
        className={`discipline-row__text ${item.imageRight ? "lg:order-1" : "lg:order-2"}`}
      >
        <p className="discipline-row__label uppercase tracking-[0.14em] text-xs text-ploy-accent-primary font-semibold mb-5">
          {item.number}, {item.label}
        </p>
        <h3 className="discipline-row__heading font-heading font-semibold text-ploy-text-primary leading-[1.15] text-2xl md:text-3xl tracking-tight text-balance">
          {item.heading}
        </h3>
        <p className="discipline-row__body text-ploy-text-secondary leading-relaxed text-base lg:text-lg mt-5">
          {item.body}
        </p>
      </motion.div>

      {/* Image/demo side */}
      <motion.div
        style={{ x: imageX, opacity: imageOpacity }}
        className={`discipline-row__image ${item.imageRight ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="discipline-row__frame border border-ploy-border-primary overflow-hidden rounded-[var(--radius-card)] shadow-xl shadow-black/5">
          <div className="discipline-row__bar border-b border-ploy-border-primary bg-ploy-neutral-primary-s2 flex items-center gap-2 px-4 py-3">
            <span className="flex gap-1.5">
              <span className="bg-red-400/80 w-2.5 h-2.5 block rounded-full" />
              <span className="bg-amber-400/80 w-2.5 h-2.5 block rounded-full" />
              <span className="bg-green-400/80 w-2.5 h-2.5 block rounded-full" />
            </span>
          </div>
          <div className="discipline-row__video-wrapper aspect-video relative overflow-hidden bg-ploy-neutral-primary-s2">
            <video
              src={item.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="discipline-row__video w-full h-full absolute inset-0 block object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
