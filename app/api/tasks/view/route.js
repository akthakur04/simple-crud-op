
// Usage example
import connectMongo from '@/lib/mongodb';
import Task from '@/models/Task';

export async function GET(req) {
  await connectMongo(); // Ensure MongoDB connection is active

  try {
    const task = await Task.find({}); // Fetch live data from MongoDB
    console.log("Task fetched successfully", task);

    if (!task || task.length === 0) {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return new Response(JSON.stringify({ error: 'Error fetching task' }), { status: 500 });
  }
}