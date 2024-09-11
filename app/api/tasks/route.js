import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';
import { getSession } from 'next-auth/react';

export async function GET(req) {
  await connectMongo();
  const session = await getSession({ req });
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const tasks = await Task.find({}).lean();
  return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST(req) {
  await connectMongo();
  const { title, description } = await req.json();

  const user = await getUserFromRequest(req); // Assume you have a utility function that gets the logged-in user from the request
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const task = new Task({
    title,
    description,
    userId: user._id,
  });

  try {
    await task.save();
    return new Response(JSON.stringify({ success: true, task }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating task' }), { status: 500 });
  }
}



