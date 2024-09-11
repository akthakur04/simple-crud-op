import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';
export async function DELETE(req, { params }) {
  await connectMongo();
  const { id } = params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting task' }), { status: 500 });
  }
}