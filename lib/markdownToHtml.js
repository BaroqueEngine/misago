import markdown from "markdown-it";
import katex from "katex";
import prism from "markdown-it-prism";

export default function markdownToHtml(text) {
  let result = markdown().use(prism).render(text);
  result = result.replace(/<em>/g, "_");
  result = result.replace(/<\/em>/g, "_");

  result = result.replace(/<p>.+?\<\/p\>/gms, (match0) => {
    return match0.replace(/\$(.+?)\$/g, (match1, p1) => {
      return katex.renderToString(p1);
    });
  });
  result = result.replace(/<table>.+?\<\/table\>/gms, (match0) => {
    return match0.replace(/\$(.+?)\$/g, (match1, p1) => {
      return katex.renderToString(p1);
    });
  });

  return result;
}
