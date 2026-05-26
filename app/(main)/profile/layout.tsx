export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      {children}
    </div>
  )
}