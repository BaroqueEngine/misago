type Item = {
  index: number;
  dead: boolean;
};

function createItem(index: number): Item {
  return {
    index,
    dead: false
  };
}

document.addEventListener("DOMContentLoaded", function() {
  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push(createItem(i));
  }
  items[2].dead = true;
  items[4].dead = true;

  /*
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.dead) {
      items.splice(i, 1);
      i--;
    }
  }
  */

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    if (item.dead) {
      items.splice(i, 1);
    }
  }

  console.log(items);
});
