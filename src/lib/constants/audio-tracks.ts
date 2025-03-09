const CDN_URL = "https://d2s890ynsra3qu.cloudfront.net/audio";

export const audioTracks = [
  {
    id: "rain",
    name: "Rain",
    src: {
      short: "/audio/glue-rain.mp4", // Short loop for immediate playback
      long: `${CDN_URL}/main-rain.mp4`,
    },
    icon: "🌧️",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
  {
    id: "thunder",
    name: "Thunder",
    src: {
      short: "/audio/glue-thunder.mp4",
      long: `${CDN_URL}/main-thunder.mp4`,
    },
    icon: "⚡",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
  {
    id: "waves",
    name: "Ocean Waves",
    src: {
      short: "/audio/glue-waves.mp4",
      long: `${CDN_URL}/main-waves.mp4`,
    },
    icon: "🌊",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
  {
    id: "wind",
    name: "Wind",
    src: {
      short: "/audio/glue-wind.mp4",
      long: `${CDN_URL}/main-wind.mp4`,
    },
    icon: "🍃",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
  {
    id: "birds",
    name: "Birds",
    src: {
      short: "/audio/glue-birds.mp4",
      long: `${CDN_URL}/main-birds.mp4`,
    },
    icon: "🐦",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
  {
    id: "fire",
    name: "Fireplace",
    src: {
      short: "/audio/glue-fire.mp4",
      long: `${CDN_URL}/main-fire.mp4`,
    },
    icon: "🔥",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
  {
    id: "crickets",
    name: "Crickets",
    src: {
      short: "/audio/glue-crickets.mp4",
      long: `${CDN_URL}/main-crickets.mp4`,
    },
    icon: "🦗",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
  {
    id: "people",
    name: "Cafe Ambience",
    src: {
      short: "/audio/glue-people.mp4",
      long: `${CDN_URL}/main-people.mp4`,
    },
    icon: "☕",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
  {
    id: "sbowl",
    name: "Singing Bowl",
    src: {
      short: "/audio/glue-sbowl.mp4",
      long: `${CDN_URL}/main-sbowl.mp4`,
    },
    icon: "🔔",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
  {
    id: "whitenoise",
    name: "White Noise",
    src: {
      short: "/audio/glue-whitenoise.mp4",
      long: `${CDN_URL}/main-whitenoise.mp4`,
    },
    icon: "📻",
    isPlaying: false,
    volume: 0.5,
    usingLongVersion: false,
  },
].map((track) => ({ ...track, usingLongVersion: false }));
