// app/api/items/route.js
export async function GET() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`);
      const data = await response.json();
  
      return new Response(JSON.stringify(data), {
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
  