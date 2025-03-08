import { AudioGrid } from "@/components/audio-player/audio-grid";

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Ambient Focus</h1>
      <AudioGrid />
    </main>
  );
}
