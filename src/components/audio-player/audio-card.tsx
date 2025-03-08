import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useAudioStore } from "@/lib/store/audio-store";

interface AudioCardProps {
  id: string;
  name: string;
  icon: string;
  volume: number;
  isPlaying: boolean;
}

export function AudioCard({
  id,
  name,
  icon,
  volume,
  isPlaying,
}: AudioCardProps) {
  const { togglePlay, setVolume } = useAudioStore();

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <h3 className="font-medium">{name}</h3>
            </div>
            <Button
              variant={isPlaying ? "default" : "outline"}
              size="icon"
              onClick={() => togglePlay(id)}
            >
              {isPlaying ? "⏸️" : "▶️"}
            </Button>
          </div>
          <Slider
            value={[volume * 100]}
            onValueChange={(value) => setVolume(id, value[0] / 100)}
            max={100}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  );
}
