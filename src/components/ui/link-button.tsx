// Astro passes children as a pre-rendered <astro-slot>, not a React element.
// Radix's asChild/Slot needs a real React element to cloneElement into, so we
// wrap Button+asChild+<a> here. See: https://github.com/withastro/astro/issues/7916
import { Button } from "./button";

type LinkButtonProps = Omit<React.ComponentProps<typeof Button>, "asChild"> & {
  href: string;
};

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
  return (
    <Button {...props} asChild>
      <a href={href}>{children}</a>
    </Button>
  );
}
