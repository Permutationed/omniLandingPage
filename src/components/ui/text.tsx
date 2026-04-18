import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "",
      muted: "text-muted-foreground",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
  },
});

type TextElement =
  | "p"
  | "span"
  | "div"
  | "blockquote"
  | "cite"
  | "label"
  | "li";

interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "ref">,
    VariantProps<typeof textVariants> {
  as?: TextElement;
}

function Text({
  as: Tag = "p",
  variant,
  size,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(textVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/* -------------------------------- Heading -------------------------------- */

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps
  extends
    Omit<React.ComponentProps<"h2">, "ref">,
    VariantProps<typeof textVariants> {
  level?: HeadingLevel;
}

function Heading({ level = 2, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return <Tag className={cn(textVariants({ size }), className)} {...props} />;
}

export { Text, Heading, textVariants };
