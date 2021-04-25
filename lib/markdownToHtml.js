import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";
import gfm from "remark-gfm";

export default async function markdownToHtml(markdown) {
  const result = await remark().use(prism).use(gfm).use(html).process(markdown);
  return result.toString();
}
