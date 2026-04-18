import {
  motion,
  type MotionValue,
  useTransform,
  useMotionValue,
} from "motion/react";

// Path traces 280x56 rect counterclockwise from center-top
const TRACE_PATH = "M 140 1 L 1 1 L 1 55 L 279 55 L 279 1 L 140 1";
const PATH_LENGTH = 2 * 140 + 2 * 56 + 2 * 140; // ≈ 672, total path length

interface PipelineBlockProps {
  name: string;
  isActive: boolean;
  isCompleted: boolean;
  isFirst: boolean;
  progress?: MotionValue<number>;
}

export function PipelineBlock({
  name,
  isActive,
  isCompleted,
  isFirst,
  progress,
}: PipelineBlockProps) {
  const defaultMV = useMotionValue(0);
  const safeProgress = progress ?? defaultMV;

  // Animate the dash offset so the stroke "draws" around the rect
  const yellowOffset = useTransform(
    safeProgress,
    [0, 0.5],
    [PATH_LENGTH, 0],
  );
  const greenOffset = useTransform(
    safeProgress,
    [0.5, 1.0],
    [PATH_LENGTH, 0],
  );

  const statusText = useTransform(safeProgress, (p: number): string => {
    if (p < 0.33) return "Pending";
    if (p < 0.66) return "In Review";
    return "Approved";
  });
  const statusColorValue = useTransform(
    safeProgress,
    (p: number): string => {
      if (p < 0.33) return "var(--ploy-text-secondary)";
      if (p < 0.66) return "#D4A017";
      return "#2E8B57";
    },
  );

  const mt = isFirst ? "" : "-mt-px";

  if (isCompleted) {
    return (
      <div
        className={`pipeline-block pipeline-block--completed relative w-[280px] h-[56px] border border-ploy-border-primary bg-ploy-background-primary ${mt} flex items-center justify-between px-5`}
      >
        <svg
          className="pipeline-block__svg absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 280 56"
          preserveAspectRatio="none"
        >
          <path
            d={TRACE_PATH}
            fill="none"
            stroke="#2E8B57"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="pipeline-block__name relative text-sm font-medium text-ploy-text-primary tracking-tight uppercase">
          {name}
        </span>
        <span className="pipeline-block__status relative text-xs font-medium text-[#2E8B57]">
          Approved
        </span>
      </div>
    );
  }

  if (isActive && progress) {
    return (
      <div
        className={`pipeline-block pipeline-block--active relative w-[280px] h-[56px] border border-ploy-border-primary bg-ploy-background-primary ${mt} flex items-center justify-between px-5 overflow-hidden`}
      >
        <svg
          className="pipeline-block__svg absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 280 56"
          preserveAspectRatio="none"
        >
          <motion.path
            d={TRACE_PATH}
            fill="none"
            stroke="#D4A017"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              pathLength: 1,
              strokeDasharray: PATH_LENGTH,
              strokeDashoffset: yellowOffset,
            }}
          />
          <motion.path
            d={TRACE_PATH}
            fill="none"
            stroke="#2E8B57"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              pathLength: 1,
              strokeDasharray: PATH_LENGTH,
              strokeDashoffset: greenOffset,
            }}
          />
        </svg>
        <span className="pipeline-block__name relative text-sm font-medium text-ploy-text-primary tracking-tight uppercase">
          {name}
        </span>
        <motion.span
          className="pipeline-block__status relative text-xs font-medium"
          style={{ color: statusColorValue }}
        >
          {statusText}
        </motion.span>
      </div>
    );
  }

  // Pending (not yet active)
  return (
    <div
      className={`pipeline-block pipeline-block--pending relative w-[280px] h-[56px] border border-ploy-border-primary bg-ploy-background-primary ${mt} flex items-center justify-between px-5 opacity-60`}
    >
      <span className="pipeline-block__name text-sm font-medium text-ploy-text-secondary tracking-tight uppercase">
        {name}
      </span>
      <span className="pipeline-block__status text-xs font-medium text-ploy-text-secondary">
        Pending
      </span>
    </div>
  );
}
