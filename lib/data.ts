export const projects = [
  {
    name: "rndvid",
    description:
      "A random media picker TUI — pick a random video, book, or audio file from any folder and open it with the default app. Features Fisher-Yates shuffle, per-folder watch history, collapsible tree view, and 141 unit tests.",
    tech: ["TypeScript", "Bun", "TUI"],
    url: "https://github.com/farzadtaherzade/rndvid",
    icon: "tv",
  },
  {
    name: "shooter-3d-treejs",
    description:
      "A 3D first-person shooter built with Three.js. An experiment in browser-based 3D rendering, game loops, and real-time interaction.",
    tech: ["JavaScript", "Three.js", "WebGL"],
    url: "https://github.com/farzadtaherzade/shooter-3d-treejs",
    icon: "gun",
  },
  {
    name: "lab-management",
    description:
      "A laboratory management system built in C#. Handles lab operations and workflow with a structured, reliable backend.",
    tech: ["C#", ".NET"],
    url: "https://github.com/farzadtaherzade/lab-management",
    icon: "flask",
  },
  {
    name: "blog-nest",

    description:
      "A full-featured blog platform backend built with NestJS. Includes RBAC authentication, article payments, user avatars, and a RESTful API with MySQL.",
    tech: ["NestJS", "TypeScript", "MySQL", "RBAC"],
    url: "https://github.com/farzadtaherzade/blog-nest",
    icon: "book",
  },
] as const;

export const skills = {
  workingWith: [
    { name: "Node.js", icon: "node" },
    { name: "TypeScript", icon: "ts" },
    { name: "C#", icon: "csharp" },
    { name: "JavaScript", icon: "js" },
    { name: "NestJS", icon: "nest" },
    { name: "Three.js", icon: "three" },
  ],
  learning: [
    { name: "C++", icon: "cpp" },
    { name: "Rust", icon: "rust" },
    { name: "Godot", icon: "godot" },
    { name: "Unity", icon: "unity" },
  ],
} as const;

export const githubUrl = "https://github.com/farzadtaherzade";
export const githubUsername = "farzadtaherzade";

export const timeline = [
  { year: "2020", label: "Started on GitHub" },
  { year: "2021", label: "Early experiments" },
  { year: "2022", label: "Building backends" },
  { year: "2023", label: "NestJS & APIs" },
  { year: "2024", label: "Blog platform & payments" },
  { year: "2025", label: "Expanding scope" },
  { year: "2026", label: "3D games & TUI tools" },
] as const;
