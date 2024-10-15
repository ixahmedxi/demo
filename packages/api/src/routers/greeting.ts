import { publicProcedure, router } from "../trpc";

export const greetingRouter = router({
  hello: publicProcedure.query(() => 'Hello World'),
})