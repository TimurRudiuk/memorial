export default function MemorialPage({ params }: { params: { id: string } }) {
  return <h1>Меморіал #{params.id}</h1>
}