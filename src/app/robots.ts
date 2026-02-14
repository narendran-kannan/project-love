import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/propose",
      },
    ],
    sitemap: "https://love.narendran.me/sitemap.xml",
  };
}
