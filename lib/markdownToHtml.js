import markdown from "markdown-it";
import katex from "katex";
import prism from "markdown-it-prism";

export default function markdownToHtml(text) {
  let result = markdown().use(prism).render(text);
  result = result.replace(/\$(.+?)\$/g, (match, p1) =>
    katex.renderToString(p1)
  );

  return result;
}
