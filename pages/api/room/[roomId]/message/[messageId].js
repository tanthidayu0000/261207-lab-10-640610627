import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const rooms = readDB();
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;

  const findroom = rooms.findIndex((x) => x.roomId === roomId);
  if (findroom === -1) {
    return res.status(404).json({ ok: false, message: "Invalid room id" });
  }

  const findmess = rooms[findroom].messages.findIndex(
    (x) => x.messageId === messageId
  );
  if (findmess === -1) {
    return res.status(404).json({ ok: false, message: "Invalid message id" });
  }

  rooms[findroom].messages.splice(findmess, 1);
  writeDB(rooms);

  return res.json({ ok: true });
}
