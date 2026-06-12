const PRODUCTION_SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://oscarpoco.com";

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

export function getPublicSiteUrl() {
  if (typeof window === "undefined") {
    return PRODUCTION_SITE_URL;
  }

  const { hostname, origin } = window.location;
  if (LOCAL_HOSTNAMES.has(hostname)) {
    return PRODUCTION_SITE_URL;
  }

  return origin || PRODUCTION_SITE_URL;
}

export function getResumeUrl(path = "/oscarkylpoco.pdf") {
  return new URL(path, getPublicSiteUrl()).href;
}
