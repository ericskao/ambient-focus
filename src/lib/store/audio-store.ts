import { Howl } from "howler";
import { create } from "zustand";

interface AudioSource {
  short: string;
  long: string;
}

interface AudioTrack {
  id: string;
  name: string;
  src: AudioSource;
  icon?: string;
  shortSound?: Howl;
  longSound1?: Howl;
  longSound2?: Howl;
  isPlaying: boolean;
  volume: number;
  usingLongVersion: boolean;
}

interface AudioStore {
  tracks: AudioTrack[];
  initTrack: (track: AudioTrack) => void;
  togglePlay: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
}

const CROSSFADE_DURATION = 2000; // 2 second crossfade
const SHORT_TO_LONG_TRANSITION = 5000; // Start transition at 5 seconds
const LOOP_OVERLAP = 4000; // Start next loop 4 seconds before current ends
const SHORT_OVERLAP_DURATION = 1000; // Both sounds play at full volume for 1 second
const SHORT_FADE_DURATION = 3000; // Gentle 3-second fade out of short version

export const useAudioStore = create<AudioStore>((set) => ({
  tracks: [],

  initTrack: (trackData) => {
    // Create the short version for immediate playback
    const shortSound = new Howl({
      src: [trackData.src.short],
      loop: true,
      volume: trackData.volume,
    });

    // Create two instances of the long version for seamless looping
    const longSound1 = new Howl({
      src: [trackData.src.long],
      loop: false,
      volume: 0,
      onload: function () {
        if (shortSound.playing()) {
          setTimeout(() => {
            // Start long version and fade it in
            longSound1.volume(0);
            longSound1.play();
            longSound1.fade(0, trackData.volume, CROSSFADE_DURATION);

            // After long version is established, start fading out short version
            setTimeout(() => {
              shortSound.fade(trackData.volume, 0, SHORT_FADE_DURATION);
              // Stop short version after fade is complete
              setTimeout(() => {
                shortSound.stop();
              }, SHORT_FADE_DURATION);
            }, SHORT_OVERLAP_DURATION);

            // Start longSound2 before the end of longSound1
            const duration = longSound1.duration() * 1000;
            setTimeout(() => {
              const track = useAudioStore
                .getState()
                .tracks.find((t) => t.id === trackData.id);
              if (track?.isPlaying && track.longSound2) {
                track.longSound2.volume(0);
                track.longSound2.play();
                track.longSound2.fade(0, track.volume, CROSSFADE_DURATION);
                track.longSound1?.fade(track.volume, 0, CROSSFADE_DURATION);
              }
            }, duration - LOOP_OVERLAP);

            set((state) => ({
              tracks: state.tracks.map((t) =>
                t.id === trackData.id ? { ...t, usingLongVersion: true } : t
              ),
            }));
          }, SHORT_TO_LONG_TRANSITION);
        }
      },
      onend: function () {
        const track = useAudioStore
          .getState()
          .tracks.find((t) => t.id === trackData.id);
        if (track?.isPlaying && track.usingLongVersion) {
          longSound1.stop();
        }
      },
    });

    const longSound2 = new Howl({
      src: [trackData.src.long],
      loop: false,
      volume: 0,
      onend: function () {
        const track = useAudioStore
          .getState()
          .tracks.find((t) => t.id === trackData.id);
        if (track?.isPlaying && track.usingLongVersion) {
          const duration = longSound2.duration() * 1000;
          longSound1.volume(0);
          longSound1.play();
          longSound1.fade(0, track.volume, CROSSFADE_DURATION);
          longSound2.fade(track.volume, 0, CROSSFADE_DURATION);

          setTimeout(() => {
            if (track.isPlaying) {
              longSound2.volume(0);
              longSound2.play();
              longSound2.fade(0, track.volume, CROSSFADE_DURATION);
              longSound1.fade(track.volume, 0, CROSSFADE_DURATION);
            }
          }, duration - LOOP_OVERLAP);
        }
      },
    });

    set((state) => ({
      tracks: [
        ...state.tracks,
        {
          ...trackData,
          shortSound,
          longSound1,
          longSound2,
          usingLongVersion: false,
        },
      ],
    }));
  },

  togglePlay: (id) => {
    set((state) => ({
      tracks: state.tracks.map((track) => {
        if (track.id === id) {
          if (track.isPlaying) {
            track.shortSound?.stop();
            track.longSound1?.stop();
            track.longSound2?.stop();
            return { ...track, isPlaying: false, usingLongVersion: false };
          } else {
            if (track.shortSound) {
              track.shortSound.volume(track.volume);
              track.shortSound.play();

              if (track.longSound1?.state() === "loaded") {
                setTimeout(() => {
                  const currentTrack = useAudioStore
                    .getState()
                    .tracks.find((t) => t.id === id);
                  if (currentTrack?.isPlaying && currentTrack.longSound1) {
                    // Start long version and fade it in
                    currentTrack.longSound1.volume(0);
                    currentTrack.longSound1.play();
                    currentTrack.longSound1.fade(
                      0,
                      currentTrack.volume,
                      CROSSFADE_DURATION
                    );

                    // After long version is established, start fading out short version
                    setTimeout(() => {
                      currentTrack.shortSound?.fade(
                        currentTrack.volume,
                        0,
                        SHORT_FADE_DURATION
                      );
                      // Stop short version after fade is complete
                      setTimeout(() => {
                        currentTrack.shortSound?.stop();
                      }, SHORT_FADE_DURATION);
                    }, SHORT_OVERLAP_DURATION);

                    const duration = currentTrack.longSound1.duration() * 1000;
                    setTimeout(() => {
                      if (currentTrack?.isPlaying && currentTrack.longSound2) {
                        currentTrack.longSound2.volume(0);
                        currentTrack.longSound2.play();
                        currentTrack.longSound2.fade(
                          0,
                          currentTrack.volume,
                          CROSSFADE_DURATION
                        );
                        currentTrack.longSound1?.fade(
                          currentTrack.volume,
                          0,
                          CROSSFADE_DURATION
                        );
                      }
                    }, duration - LOOP_OVERLAP);

                    set((state) => ({
                      tracks: state.tracks.map((t) =>
                        t.id === id ? { ...t, usingLongVersion: true } : t
                      ),
                    }));
                  }
                }, SHORT_TO_LONG_TRANSITION);
              }
            }
            return { ...track, isPlaying: true };
          }
        }
        return track;
      }),
    }));
  },

  setVolume: (id, volume) => {
    set((state) => ({
      tracks: state.tracks.map((track) => {
        if (track.id === id) {
          if (track.usingLongVersion) {
            track.longSound1?.volume(volume);
            track.longSound2?.volume(volume);
          } else {
            track.shortSound?.volume(volume);
          }
          return { ...track, volume };
        }
        return track;
      }),
    }));
  },
}));
