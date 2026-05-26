export default async function MemorialsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = await res.json()

  return (
    <div>
      <h1>Всі меморіали</h1>
      <ul>
        {users.map((user: { id: number; name: string; email: string }) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}