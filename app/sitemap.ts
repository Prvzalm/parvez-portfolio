import type { MetadataRoute } from "next";
import { site } from "../data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!/^https?:\/\//.test(site.siteUrl)) return [];
  return [
    {
      url: site.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
