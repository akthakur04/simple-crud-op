import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(req, { params }) {
  await connectMongo();
  const { id } = params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching task' }), { status: 500 });
  }
}
