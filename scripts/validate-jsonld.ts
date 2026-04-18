// Fetches rendered pages and validates JSON-LD against Google Rich Results essentials.

type Issue = { level: "error" | "warn"; msg: string; path?: string };

function validateNode(node: any, path = ""): Issue[] {
  const issues: Issue[] = [];
  const type = node["@type"];
  if (!type) issues.push({ level: "error", msg: "missing @type", path });
  if (!node["@context"] && !path) {
    issues.push({ level: "error", msg: "missing @context at root", path });
  }

  const types = Array.isArray(type) ? type : [type];
  for (const t of types) {
    if (t === "Organization" || t === "MedicalOrganization") {
      if (!node.name) issues.push({ level: "error", msg: "Organization: name required", path });
      if (!node.url) issues.push({ level: "warn", msg: "Organization: url recommended", path });
      if (!node.logo) issues.push({ level: "warn", msg: "Organization: logo recommended for knowledge panel", path });
      if (node.logo && typeof node.logo === "object" && !node.logo.url) {
        issues.push({ level: "error", msg: "Organization.logo: ImageObject missing url", path });
      }
    }
    if (t === "WebSite") {
      if (!node.name) issues.push({ level: "error", msg: "WebSite: name required", path });
      if (!node.url) issues.push({ level: "error", msg: "WebSite: url required", path });
    }
    if (t === "WebPage") {
      if (!node.name) issues.push({ level: "warn", msg: "WebPage: name recommended", path });
      if (!node.url) issues.push({ level: "warn", msg: "WebPage: url recommended", path });
    }
    if (t === "SoftwareApplication") {
      if (!node.name) issues.push({ level: "error", msg: "SoftwareApplication: name required", path });
      if (!node.applicationCategory) {
        issues.push({ level: "error", msg: "SoftwareApplication: applicationCategory required by Google", path });
      }
      if (!node.offers) {
        issues.push({ level: "warn", msg: "SoftwareApplication: offers recommended", path });
      }
    }
    if (t === "Article" || t === "NewsArticle" || t === "BlogPosting") {
      if (!node.headline) issues.push({ level: "error", msg: `${t}: headline required`, path });
      if (!node.datePublished) issues.push({ level: "warn", msg: `${t}: datePublished recommended`, path });
      if (!node.author) issues.push({ level: "warn", msg: `${t}: author recommended`, path });
      if (!node.image) issues.push({ level: "warn", msg: `${t}: image recommended for rich results`, path });
    }
    if (t === "ContactPoint") {
      if (!node.contactType) issues.push({ level: "error", msg: "ContactPoint: contactType required", path });
      if (!node.telephone && !node.email && !node.url) {
        issues.push({ level: "warn", msg: "ContactPoint: telephone/email/url recommended", path });
      }
    }
  }

  // Recurse into nested nodes
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("@")) continue;
    if (v && typeof v === "object" && !Array.isArray(v) && (v as any)["@type"]) {
      issues.push(...validateNode(v, `${path}.${k}`));
    }
    if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (item && typeof item === "object" && (item as any)["@type"]) {
          issues.push(...validateNode(item, `${path}.${k}[${i}]`));
        }
      });
    }
  }
  return issues;
}

async function fetchAndValidate(url: string) {
  console.log(`\n=== ${url} ===`);
  const res = await fetch(url, { redirect: "manual" });
  console.log(`HTTP ${res.status}`);
  if (res.status >= 300 && res.status < 400) {
    console.log(`  → redirects to ${res.headers.get("location")}`);
    return;
  }
  const html = await res.text();
  const matches = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  console.log(`Found ${matches.length} JSON-LD block(s)`);

  for (let i = 0; i < matches.length; i++) {
    const raw = matches[i][1].trim();
    let data: any;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.log(`  Block ${i + 1}: PARSE ERROR ${e}`);
      continue;
    }
    const nodes = Array.isArray(data) ? data : [data];
    console.log(`  Block ${i + 1}: ${nodes.length} node(s)`);
    const typeList = nodes.map((n) => {
      const t = n["@type"];
      return Array.isArray(t) ? t.join("+") : t;
    });
    console.log(`  Types: ${typeList.join(", ")}`);
    const ids = nodes.map((n) => n["@id"]).filter(Boolean);
    console.log(`  @ids: ${ids.length}/${nodes.length} linked`);

    const allIssues: Issue[] = [];
    nodes.forEach((n, idx) => allIssues.push(...validateNode(n, `#${idx}`)));
    if (allIssues.length === 0) {
      console.log(`  ✓ No issues`);
    } else {
      const errors = allIssues.filter((i) => i.level === "error");
      const warns = allIssues.filter((i) => i.level === "warn");
      console.log(`  ${errors.length} error(s), ${warns.length} warning(s)`);
      for (const issue of allIssues) {
        console.log(`    [${issue.level}] ${issue.path ?? ""} ${issue.msg}`);
      }
    }
  }
}

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error("usage: bun run scripts/validate-jsonld.ts <url> [url...]");
  process.exit(1);
}
for (const u of urls) {
  await fetchAndValidate(u);
}

export {};
