import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "@/components/BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  coverImage: string;
  coverColor: string;
  variant?: BookCoverVariant;
  className?: string;
}

const BookCover = ({
  coverImage = "https://placehold.co/400x600.png",
  coverColor = "#012B48",
  variant = "regular",
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "transition-all duration-300 relative",
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className={"absolute z-10"}
        style={{ left: "12%", height: "88%", width: "87.5%" }}
      >
        <Image
          src={coverImage}
          alt={"Book Cover"}
          fill
          className={"object-fill rounded-sm"}
        />
      </div>
    </div>
  );
};
export default BookCover;
