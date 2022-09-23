import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const findroom = rooms.findIndex((x) => x.roomId === roomId);
    if (findroom === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    return res.json({ ok: true, messages: rooms[findroom].messages });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const findroom = rooms.findIndex((x) => x.roomId === roomId);
    if (findroom === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }
    if (typeof req.body.text !== "string" || req.body.text.length === 0) {
      return res.status(404).json({ ok: false, message: "Invalid text input" });
    }

    const text = req.body.text;
    const newId = uuidv4();
    const newText = {
      messageId: newId,
      text: text,
    };
    rooms[findroom].messages.push(newText);
    writeDB(rooms);
    return res.json({ ok: true, message: newText });
  }
}
