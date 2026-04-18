import type { AnalyticsInstance } from "analytics";

const INGEST_URL = "/_ploy/ingest";

type IngestEvent = {
  type: string;
  event?: string;
  anonymousId?: string;
  userId?: string;
  properties?: Record<string, unknown>;
  traits?: Record<string, unknown>;
};

function send(event: IngestEvent): void {
  const payload = JSON.stringify({
    ...event,
    context: {
      page: {
        url: location.href,
        path: location.pathname,
        title: document.title,
        referrer: document.referrer,
      },
      userAgent: navigator.userAgent,
      locale: navigator.language,
    },
    timestamp: new Date().toISOString(),
  });
  navigator.sendBeacon(
    INGEST_URL,
    new Blob([payload], { type: "application/json" }),
  );
}

export default function ployAnalyticsPlugin() {
  let spaCleanup: (() => void) | undefined;
  return {
    name: "ploy-analytics",

    initialize: ({ instance }: { instance: AnalyticsInstance }) => {
      if (typeof window !== "undefined") {
        const origPush = history.pushState;
        history.pushState = function (
          ...args: Parameters<typeof history.pushState>
        ) {
          origPush.apply(this, args);
          instance.page();
        };
        const onPopState = () => instance.page();
        window.addEventListener("popstate", onPopState);
        spaCleanup = () => {
          history.pushState = origPush;
          window.removeEventListener("popstate", onPopState);
        };
      }
    },

    page: ({
      payload,
    }: {
      payload: {
        anonymousId?: string;
        userId?: string;
        properties?: Record<string, unknown>;
      };
    }) => {
      send({
        type: "page",
        anonymousId: payload.anonymousId,
        userId: payload.userId,
        properties: payload.properties,
      });
    },

    track: ({
      payload,
    }: {
      payload: {
        event: string;
        anonymousId?: string;
        userId?: string;
        properties?: Record<string, unknown>;
      };
    }) => {
      send({
        type: "track",
        event: payload.event,
        anonymousId: payload.anonymousId,
        userId: payload.userId,
        properties: payload.properties,
      });
    },

    identify: ({
      payload,
    }: {
      payload: {
        anonymousId?: string;
        userId?: string;
        traits?: Record<string, unknown>;
      };
    }) => {
      send({
        type: "identify",
        anonymousId: payload.anonymousId,
        userId: payload.userId,
        traits: payload.traits,
      });
    },

    loaded: (): boolean => true,

    teardown: () => {
      if (spaCleanup) spaCleanup();
    },
  };
}
