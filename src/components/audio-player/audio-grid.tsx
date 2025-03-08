"use client";

import { audioTracks } from "@/lib/constants/audio-tracks";
import { useAudioStore } from "@/lib/store/audio-store";
import { useEffect } from "react";
import { AudioCard } from "./audio-card";

export function AudioGrid() {
  const { tracks, initTrack } = useAudioStore();

  useEffect(() => {
    // Initialize tracks if they haven't been loaded
    if (tracks.length === 0) {
      audioTracks.forEach((track) => initTrack(track));
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {tracks.map((track) => (
        <AudioCard
          key={track.id}
          id={track.id}
          name={track.name}
          icon={track.icon || "🔊"}
          volume={track.volume}
          isPlaying={track.isPlaying}
        />
      ))}
    </div>
  );
}
