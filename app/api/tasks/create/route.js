import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';

export async function POST(req) {
  await connectMongo();
  const { title, description, userId } = await req.json();

  try {
    const newTask = await Task.create({
      title,
      description,
      userId,
    });
    return new Response(JSON.stringify(newTask), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating task' }), { status: 400 });
  }
}
