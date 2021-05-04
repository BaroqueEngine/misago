import * as mh from "./montyhall";

function run(changeTheDoor: boolean, max: number): void {
  let win = 0;
  let total = 0;

  for (let i = 0; i < max; i++) {
    if (mh.run(3, changeTheDoor)) {
      win++;
    }
    total++;
  }
  const winRate = ((win / total) * 100).toFixed(2);

  let text = "扉を変えない場合";
  if (changeTheDoor) {
    text = "扉を変える場合";
  }
  console.log(text);
  console.log(`${win} / ${total} 勝率 ${winRate}%`);
}

const iterations = 10000;

run(true, iterations);
run(false, iterations);
