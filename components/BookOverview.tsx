import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/BookCover";

const BookOverview = ({
  id,
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  coverColor,
  coverUrl,
  video,
  summary,
}: Book) => {
  return (
    <section className={"book-overview"}>
      <div className={"flex flex-col flex-1 gap-5"}>
        <h1>{title}</h1>
        <div className={"book-info"}>
          <p>
            By <span className={"text-light-200 font-semibold"}>{author}</span>
          </p>{" "}
          <p>
            Category:{" "}
            <span className={"text-light-200 font-semibold"}>{genre}</span>
          </p>
          <div className={"flex flex-row gap-1"}>
            <Image
              src={"/icons/star.svg"}
              alt={"star"}
              width={22}
              height={22}
            />
            <p>{rating}</p>
          </div>
        </div>
        <div className={"book-copies"}>
          <p>
            Total Books: <span>{total_copies}</span>
          </p>
          <p>
            Availabe Books: <span>{available_copies}</span>
          </p>
        </div>
        <p className={"book-description"}>{description}</p>
        <Button className={"book-overview_btn"}>
          <Image src={"/icons/book.svg"} alt={"book"} height={20} width={20} />
          <p className={"font-bebas-neue text-xl text-dark-100"}>Borrow</p>
        </Button>
      </div>
      <div className={"relative flex-1 flex justify-center"}>
        <div className={"relative"}>
          <BookCover
            variant={"wide"}
            coverImage={coverUrl}
            coverColor={coverColor}
            className={"z-10"}
          />
          <div
            className={
              "absolute left-16 top-10 opacity-40 rotate-12 max-sm:hidden"
            }
          >
            <BookCover
              variant={"wide"}
              coverImage={coverUrl}
              coverColor={coverColor}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default BookOverview;
