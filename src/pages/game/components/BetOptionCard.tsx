import { BetOptionT } from "@/typing/game";
import { memo } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "flex flex-col items-center justify-center p-4 border w-full rounded-lg cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-gray-300",
        selected: " border-primary bg-primary/10 ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BetOptionCardProps = BetOptionT & VariantProps<typeof cardVariants>;

const BetOptionCard = ({ variant, position, amount }: BetOptionCardProps) => {
  return (
    <div className={cn(cardVariants({ variant }))}>
      <h1 className="text-xl font-semibold capitalize ">{position}</h1>
      <p className=" text-sm font-semibold text-primary text-red-800">
        ${amount}
      </p>
    </div>
  );
};

export default memo(BetOptionCard);
