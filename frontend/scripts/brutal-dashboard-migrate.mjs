import fs from "fs";
import path from "path";

const roots = [
  "src/app/creator",
  "src/app/hunter",
  "src/features/creators",
  "src/components/creator",
  "src/components/hunter",
  "src/components/auth",
  "src/components/wallet",
];

const replacements = [
  [/bg-\[#141026\]/g, "brutal-border brutal-shadow bg-card"],
  [/bg-\[#121015\]/g, "brutal-border brutal-shadow bg-card"],
  [/bg-\[#1B1540\]/g, "brutal-border bg-background"],
  [/bg-\[#18122D\]/g, "brutal-border bg-muted"],
  [/bg-\[#9011FF\]/g, "brutal-border brutal-shadow bg-brutal-pink"],
  [/hover:bg-\[#7d0dd4\]/g, "hover:translate-x-[-1px] hover:translate-y-[-1px]"],
  [/hover:bg-purple-700/g, "hover:translate-x-[-1px] hover:translate-y-[-1px]"],
  [/bg-purple-600/g, "brutal-border brutal-shadow bg-brutal-pink"],
  [/text-\[#B78CFF\]/g, "text-foreground"],
  [/text-\[#B48CFF\]/g, "text-muted-foreground"],
  [/text-\[#CFC9FF\]/g, "text-foreground"],
  [/text-\[#9011FF\]/g, "text-foreground"],
  [/hover:text-purple-300/g, "hover:text-brutal-violet"],
  [/hover:text-purple-400/g, "hover:text-brutal-violet"],
  [/hover:border-\[#9011FF\]/g, "hover:border-brutal-pink"],
  [/border-white\/10/g, "border-foreground/30"],
  [/bg-white\/\[0\.03\]/g, "brutal-border bg-background"],
  [/shadow-purple-500\/30/g, ""],
  [/shadow-purple-500\/50/g, ""],
  [/rounded-xl/g, ""],
  [/rounded-2xl/g, ""],
  [/rounded-lg/g, ""],
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (e.name.endsWith(".tsx") || e.name.endsWith(".ts")) files.push(p);
  }
  return files;
}

let changed = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    let content = fs.readFileSync(file, "utf8");
    const orig = content;
    for (const [re, rep] of replacements) {
      content = content.replace(re, rep);
    }
    if (
      file.includes("creator") ||
      file.includes("hunter") ||
      file.includes("creators")
    ) {
      content = content.replace(/\btext-white\b/g, "text-foreground");
    }
    if (content !== orig) {
      fs.writeFileSync(file, content);
      changed++;
      console.log("updated", file);
    }
  }
}
console.log("Total files updated:", changed);
