// 記事ページのプレビュー：choujin.net を中継し、<head> に超人図鑑の記事用コード（/article/head.html）を差し込む。noindex。
export default async (req) => {
  const u = new URL(req.url);
  const res = await fetch("https://choujin.net" + u.pathname + u.search, {
    headers: { "user-agent": req.headers.get("user-agent") || "", "accept": req.headers.get("accept") || "*/*", "accept-language": "ja" },
    redirect: "manual",
  });
  const ct = res.headers.get("content-type") || "";
  const h = new Headers(res.headers);
  h.delete("content-length"); h.delete("content-encoding"); h.set("x-robots-tag", "noindex");
  if (!ct.includes("text/html")) return new Response(res.body, { status: res.status, headers: h });
  const code = await fetch(new URL("/article/head.html", u.origin)).then(r => r.text());
  let html = await res.text();
  html = html.replace("</head>", '<meta name="robots" content="noindex">' + code + "</head>");
  return new Response(html, { status: res.status, headers: h });
};
export const config = { path: "/*", excludedPath: ["/", "/index.html", "/embed.html", "/embed_test.html", "/article/*", "/top/*"] };
