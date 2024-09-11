import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task'; // Assuming you have a Task model defined

export async function PUT(req, { params }) {
  await connectMongo();
  const { id } = params; // Get task ID from the URL
  const { title, description } = await req.json();

  try {
    const task = await Task.findById(id);

    if (!task) {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
    }

    task.title = title || task.title;
    task.description = description || task.description;

    await task.save();

    return new Response(JSON.stringify({ success: true, task }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating task' }), { status: 500 });
  }
}
