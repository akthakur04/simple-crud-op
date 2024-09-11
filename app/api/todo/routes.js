// pages/api/todo.js

import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('myapp');
    const collection = db.collection('tasks');
    const tasks = await collection.find({}).toArray();
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
