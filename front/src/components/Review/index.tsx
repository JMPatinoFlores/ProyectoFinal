"use client";

import { Label, Textarea } from "flowbite-react";

export function Review() {
  return (
    <div className="w-full">
      <div className="my-2 block">
        <Label htmlFor="comment" value="Tu opinión" />
      </div>
      <Textarea
        id="comment"
        placeholder="El hotel me pareció..."
        required
        rows={4}
      />
    </div>
  );
}
