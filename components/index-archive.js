import PostPreview from "./post-preview";

export default function c({ posts }) {
  const tags = [
    "math",
    "random",
    "physics",
    "curve",
    "circle",
    "string",
    "graph",
    "shader",
    "sprite",
    "tilemap",
    "particle",
    "steering",
    "image_processing",
    "map",
    "simulation",
    "sound",
    "statistics",
    "array",
    "input",
    "svg",
  ];
  const names = {};
  names["math"] = "数学";
  names["random"] = "ランダム";
  names["physics"] = "物理";
  names["curve"] = "曲線";
  names["circle"] = "円";
  names["string"] = "文字列";
  names["graph"] = "グラフ";
  names["shader"] = "シェーダー";
  names["sprite"] = "スプライト";
  names["tilemap"] = "タイルマップ";
  names["particle"] = "パーティクル";
  names["steering"] = "操舵行動";
  names["image_processing"] = "画像処理";
  names["map"] = "マップ";
  names["simulation"] = "シミュレーション";
  names["sound"] = "サウンド";
  names["statistics"] = "統計";
  names["array"] = "配列";
  names["input"] = "入力";
  names["svg"] = "SVG";

  return (
    <section className="max-w-4xl m-auto px-8 py-14">
      <h2 className="py-7 mb-8 text-xl text-center text-gray-400 font-index font-bold tracking-widest leading-tight">
        記事一覧
      </h2>
      {tags.map((tag) => (
        <div key={tag} className="mb-16">
          <h3 className="font-index mb-3 border-b border-main-border text-lg text-main-green">
            {names[tag]}
          </h3>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-x-2 px-1">
            {posts[tag].map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
