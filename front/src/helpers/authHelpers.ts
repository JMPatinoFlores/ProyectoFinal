import { NextRouter } from "next/router";

export const onRedirectCallback = (appState: any, router: NextRouter) => {
  router.push(appState?.returnTo || "/home");
};
