import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';
import { getSession } from 'next-auth/react';

export async function GET(req, { params }) {
  await connectMongo();
  const session = await getSession({ req });

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const task = await Task.findById(id);

  if (!task || task.userId.toString() !== session.user.id) {
    return new Response(JSON.stringify({ error: 'Task not found or unauthorized' }), { status: 404 });
  }

  return new Response(JSON.stringify(task), { status: 200 });
}

export async function PUT(req, { params }) {
  await connectMongo();
  const session = await getSession({ req });

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const { title, description, completed } = await req.json();
  
  const task = await Task.findById(id);

  if (!task || task.userId.toString() !== session.user.id) {
    return new Response(JSON.stringify({ error: 'Task not found or unauthorized' }), { status: 404 });
  }

  task.title = title;
  task.description = description;
  task.completed = completed;

  await task.save();
  return new Response(JSON.stringify(task), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectMongo();
  const session = await getSession({ req });

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { id } = params;
  const task = await Task.findById(id);

  if (!task || task.userId.toString() !== session.user.id) {
    return new Response(JSON.stringify({ error: 'Task not found or unauthorized' }), { status: 404 });
  }

  await task.remove();
  return new Response(JSON.stringify({ message: 'Task deleted' }), { status: 200 });
}
