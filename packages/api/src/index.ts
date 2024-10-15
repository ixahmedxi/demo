import { greetingRouter } from "./routers/greeting";
import { router } from "./trpc";
import { getBaseUrl } from '@noodle/utils/base-url'

export const baseUrl = getBaseUrl()

export const appRouter = router({
  greeting: greetingRouter
})

export type AppRouter = typeof appRouter;
