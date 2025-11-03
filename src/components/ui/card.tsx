// src/components/ui/card.tsx
'use client'
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/* -------------------------------- Variants ------------------------------- */

const cardVariants = cva(
  [
    "bg-card text-card-foreground border border-border",
    "rounded-xl shadow-sm",
    "transition-all motion-safe:duration-200",
    // klavye kullanıcıları için görünür odak
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ring-offset-background",
  ].join(" "),
  {
    variants: {
      elevation: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      interactive: {
        true: "hover:shadow-lg hover:border-primary/30",
        false: "",
      },
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row",
      },
      separated: {
        true: "divide-y",
        false: "",
      },
      radius: {
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      elevation: "sm",
      interactive: false,
      orientation: "vertical",
      separated: false,
      radius: "xl",
    },
  }
);

type Padding = "none" | "sm" | "md" | "lg";

const PAD: Record<Padding, string> = {
  none: "px-0 py-0",
  sm: "px-4 py-4",
  md: "px-6 py-6",
  lg: "px-8 py-8",
};

/* ------------------------------ Context (padding) ------------------------------ */

type CardCtx = { padding: Padding };
const CardPaddingContext = React.createContext<CardCtx>({ padding: "md" });

function useCardPadding(): string {
  const { padding } = React.useContext(CardPaddingContext);
  return PAD[padding];
}

/* ---------------------------------- Card --------------------------------- */

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean;
    padding?: Padding; // alt slotlar için varsayılan padding
  };

export function Card({
  className,
  asChild,
  elevation,
  interactive,
  orientation,
  separated,
  radius,
  padding = "md",
  ...props
}: CardProps): React.JSX.Element {
  const Comp = asChild ? Slot : "div";
  return (
    <CardPaddingContext.Provider value={{ padding }}>
      <Comp
        className={cn(
          cardVariants({ elevation, interactive, orientation, separated, radius }),
          className
        )}
        {...props}
      />
    </CardPaddingContext.Provider>
  );
}

/* ------------------------------ Subcomponents ----------------------------- */

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  withDivider?: boolean;
};

export function CardHeader({
  className,
  withDivider,
  ...props
}: CardHeaderProps): React.JSX.Element {
  const pad = useCardPadding();
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        pad,
        withDivider && "border-b",
        className
      )}
      {...props}
    />
  );
}

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({
  className,
  ...props
}: CardTitleProps): React.JSX.Element {
  return (
    <h3
      className={cn("text-lg font-semibold leading-tight tracking-tight", className)}
      {...props}
    />
  );
}

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({
  className,
  ...props
}: CardDescriptionProps): React.JSX.Element {
  return (
    <p
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({
  className,
  ...props
}: CardContentProps): React.JSX.Element {
  const pad = useCardPadding();
  return <div className={cn(pad, className)} {...props} />;
}

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  withDivider?: boolean;
};

export function CardFooter({
  className,
  withDivider = true,
  ...props
}: CardFooterProps): React.JSX.Element {
  const pad = useCardPadding();
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        pad,
        withDivider && "border-t",
        className
      )}
      {...props}
    />
  );
}

/* ------------------------------ Extras (opsiyonel) ------------------------------ */

export type CardActionsProps = React.HTMLAttributes<HTMLDivElement>;

export function CardActions({
  className,
  ...props
}: CardActionsProps): React.JSX.Element {
  return <div className={cn("flex items-center gap-3", className)} {...props} />;
}

export type CardMediaProps = React.HTMLAttributes<HTMLDivElement> & {
  aspect?: "none" | "square" | "video";
  inset?: boolean; // true ise padding uygulama
};

export function CardMedia({
  className,
  aspect = "none",
  inset = true,
  ...props
}: CardMediaProps): React.JSX.Element {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "video"
      ? "aspect-video"
      : "";

  return (
    <div
      className={cn(
        "overflow-hidden",
        aspectClass,
        inset ? "" : "mx-0 my-0",
        className
      )}
      {...props}
    />
  );
}
