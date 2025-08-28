export default function parseRooms(roomsStr: string): number[] {
  return roomsStr.split(",").map(r => Number(r.trim()));
}
