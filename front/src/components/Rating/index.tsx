"use client";

import { Rating } from "flowbite-react";
import { Review } from "../Review";

export function Rate() {
  return (
    <Rating>
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star filled={false} />
      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        4.95 de 5
      </p>
    </Rating>
  );
}
