// import { NextResponse } from 'next/server';
// import connectMongo from '@/lib/mongodb';
// import Task from '@/models/Task';
// export async function GET() {
//   try {
//     await connectMongo();
//     console.log('Connected to MongoDB');
//     const tasks = await Task.find({}).lean();
//     console.log(`Fetched ${tasks.length} tasks from the database`);
//     return NextResponse.json(tasks, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
//   } catch (e) {
//     console.error('Error fetching tasks:', e);
//     return NextResponse.json({ error: 'Unable to fetch tasks' }, { status: 500 });
//   }
// }
// app/api/todo/route.js
import clientPromise from '@/lib/mongodb2';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('myapp');
    const collection = db.collection('tasks');
    const tasks = await collection.find({}).toArray();
    console.log('44',tasks)
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
