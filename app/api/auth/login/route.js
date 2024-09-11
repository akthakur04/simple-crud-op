import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  await connectMongo();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 400 });
  }

  // Return only non-sensitive user data
  const userResponse = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  return new Response(JSON.stringify({ success: true, user: userResponse }), { status: 200 });
}
