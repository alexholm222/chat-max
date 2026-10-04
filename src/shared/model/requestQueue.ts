import PQueue from "p-queue";

export const requestQueue = new PQueue({
  concurrency: 1,
});
