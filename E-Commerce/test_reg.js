async function run() {
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        role: 'buyer'
      })
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
run();
