import MemeMinter from '@/components/MemeMinter'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Meme Minter</h1>
      <MemeMinter />
    </main>
  )
}