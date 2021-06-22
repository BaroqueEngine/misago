import markdown from "markdown-it";
import katex from "katex";
import prism from "markdown-it-prism";

function adjustKatexString(str) {
  str = str.replace(/<em>/g, "_");
  str = str.replace(/<\/em>/g, "_");
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/&lt;/g, "<");
  str = str.replace(/&gt;/g, ">");

  return str;
}

export default function markdownToHtml(text) {
  let result = markdown({ html: true }).use(prism).render(text);

  result = result.replace(/<p>.+?\<\/p\>/gms, (match0) => {
    return match0.replace(/\$(.+?)\$/g, (match1, p1) => {
      p1 = adjustKatexString(p1);
      return katex.renderToString(p1);
    });
  });
  result = result.replace(/<table>.+?\<\/table\>/gms, (match0) => {
    return match0.replace(/\$(.+?)\$/g, (match1, p1) => {
      p1 = adjustKatexString(p1);
      return katex.renderToString(p1);
    });
  });
  result = result.replace(/<ul>.+?\<\/ul\>/gms, (match0) => {
    return match0.replace(/\$(.+?)\$/g, (match1, p1) => {
      p1 = adjustKatexString(p1);
      return katex.renderToString(p1);
    });
  });

  return result;
}
