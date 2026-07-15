import type { Collection } from "./types";

export const collections: Collection[] = [
  {
    id: "col-atelier",
    slug: "atelier-01",
    name: "Atelier 01",
    tagline: "The debut chapter",
    description:
      "A study in restraint. Sculpted silhouettes, honest materials, quiet colour.",
    season: "AW 26",
    productIds: ["p1", "p2", "p3", "p6"],
  },
  {
    id: "col-noir",
    slug: "noir-edit",
    name: "Noir Edit",
    tagline: "After dark",
    description: "Evening essentials cut from midnight wool and heavy silk.",
    season: "AW 26",
    productIds: ["p4", "p5", "p8", "p10"],
  },
  {
    id: "col-linen",
    slug: "linen-society",
    name: "Linen Society",
    tagline: "Warm months, undone",
    description: "Belgian linen shaped for coastal light and long lunches.",
    season: "SS 26",
    productIds: ["p7", "p9", "p11", "p12"],
  },
];