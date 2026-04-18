import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
    },
    gap: {
      0: "gap-0",
      0.5: "gap-0.5",
      1: "gap-1",
      1.5: "gap-1.5",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
    },
  },
});

type StackProps = Omit<React.ComponentProps<"div">, "ref"> &
  Omit<VariantProps<typeof stackVariants>, "direction">;

function HStack({
  gap,
  align,
  justify,
  wrap,
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        stackVariants({ direction: "row", gap, align, justify, wrap }),
        className,
      )}
      {...props}
    />
  );
}

function VStack({
  gap,
  align,
  justify,
  wrap,
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        stackVariants({ direction: "col", gap, align, justify, wrap }),
        className,
      )}
      {...props}
    />
  );
}

export { HStack, VStack, stackVariants };
