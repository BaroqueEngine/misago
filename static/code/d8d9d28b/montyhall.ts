const DoorType = {
  Wrong: "wrong",
  Correct: "Correct",
} as const;
type DoorType = typeof DoorType[keyof typeof DoorType];

export function run(num: number, changeTheDoor: boolean): boolean {
  const doors = createDoors(num);
  const correctDoorNum = setCorrentDoor(doors);
  const chosenDoorNum = pick(num);
  const otherDoorNum = openTheWrongDoors(doors, chosenDoorNum, correctDoorNum);

  if (changeTheDoor) {
    return otherDoorNum === correctDoorNum;
  } else {
    return chosenDoorNum === correctDoorNum;
  }
}

function pick(num: number): number {
  return Math.floor(Math.random() * num);
}

function setCorrentDoor(doors: DoorType[]): number {
  const num = pick(doors.length);
  doors[num] = DoorType.Correct;
  return num;
}

function createDoors(num: number): DoorType[] {
  const doors: DoorType[] = [];
  for (let i = 0; i < num; i++) {
    doors[i] = DoorType.Wrong;
  }
  return doors;
}

function openTheWrongDoors(doors: DoorType[], chosenNum: number, correctDoorNum: number): number {
  if (doors[chosenNum] === DoorType.Correct) {
    return (chosenNum + 1) % doors.length;
  }

  return correctDoorNum;
}
