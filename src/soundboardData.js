// Proxy Dash - Soundboard Catalog & Web Audio Synthesizer
// 100% self-contained, zero external dependencies, 0ms latency, zero 404s

export const SOUND_CATEGORIES = [
  { id: 'all', name: 'All Sounds', icon: '✦' },
  { id: 'memes', name: '🔥 Viral & Memes', icon: '🔥' },
  { id: 'gaming', name: '🎮 Gaming & 8-Bit', icon: '🎮' },
  { id: 'impacts', name: '💥 Hits & Bass', icon: '💥' },
  { id: 'alerts', name: '🔔 Alerts & Chimes', icon: '🔔' },
  { id: 'voices', name: '🎉 Reactions & Fun', icon: '🎉' },
];

export const SOUNDBOARDS = [
  {
    id: 'vine-boom',
    name: 'Vine Boom',
    category: 'memes',
    icon: '💥',
    tag: 'Trending',
    duration: '1.2s',
    desc: 'Deep thunderous bass drop impact with booming reverb.',
    color: 'from-amber-500 to-rose-600',
    hotkey: '1',
  },
  {
    id: 'airhorn',
    name: 'MLG Airhorn',
    category: 'memes',
    icon: '🎺',
    tag: 'Classic',
    duration: '1.4s',
    desc: 'Triple blast MLG stadium airhorn fanfare.',
    color: 'from-yellow-400 to-amber-600',
    hotkey: '2',
  },
  {
    id: 'metal-pipe',
    name: 'Metal Pipe Clang',
    category: 'memes',
    icon: '🔩',
    tag: 'Viral',
    duration: '1.6s',
    desc: 'High-resonance metallic hollow pipe hitting the floor.',
    color: 'from-slate-400 to-cyan-600',
    hotkey: '3',
  },
  {
    id: 'bruh',
    name: 'Bruh Sound Effect',
    category: 'memes',
    icon: '🗿',
    tag: 'Meme',
    duration: '0.8s',
    desc: 'Low-pitched synthetic vocal "Bruh" drop.',
    color: 'from-sky-400 to-indigo-600',
    hotkey: '4',
  },
  {
    id: 'taco-bell',
    name: 'Taco Bell Bong',
    category: 'memes',
    icon: '🔔',
    tag: 'Iconic',
    duration: '2.5s',
    desc: 'Deep resonant church bell chime with metallic sustain.',
    color: 'from-purple-500 to-indigo-700',
    hotkey: '5',
  },
  {
    id: 'sad-trombone',
    name: 'Sad Trombone',
    category: 'memes',
    icon: '🎷',
    tag: 'Fail',
    duration: '2.4s',
    desc: 'Wah-wah-wah-waaaah losing brass trombone slide.',
    color: 'from-rose-500 to-pink-700',
    hotkey: '6',
  },
  {
    id: 'fart-reverb',
    name: 'Fart with Reverb',
    category: 'memes',
    icon: '💨',
    tag: 'Funny',
    duration: '1.8s',
    desc: 'Deep resonant bubbly frequency drop in a giant hall.',
    color: 'from-emerald-500 to-teal-700',
    hotkey: '7',
  },
  {
    id: 'anime-wow',
    name: 'Anime Wow',
    category: 'memes',
    icon: '✨',
    tag: 'Kawaii',
    duration: '1.0s',
    desc: 'High sparkling anime reaction "Wooooow" chime.',
    color: 'from-pink-400 to-rose-500',
    hotkey: '8',
  },
  {
    id: 'buzzer-wrong',
    name: 'Buzzer Error',
    category: 'memes',
    icon: '❌',
    tag: 'Wrong',
    duration: '0.9s',
    desc: 'Harsh double pulse red error game show buzzer.',
    color: 'from-red-600 to-rose-700',
    hotkey: '9',
  },
  {
    id: 'emotional-damage',
    name: 'Orchestral Hit',
    category: 'memes',
    icon: '🎻',
    tag: 'Impact',
    duration: '1.1s',
    desc: 'Punchy staccato orchestral hit chord with dramatic reverb.',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'coin-8bit',
    name: '8-Bit Coin',
    category: 'gaming',
    icon: '🪙',
    tag: 'Retro',
    duration: '0.4s',
    desc: 'Classic bright arcade golden coin pickup ping.',
    color: 'from-yellow-300 to-amber-500',
  },
  {
    id: 'jump-8bit',
    name: '8-Bit Jump',
    category: 'gaming',
    icon: '🍄',
    tag: 'Retro',
    duration: '0.3s',
    desc: 'Upward frequency sweep retro platformer jump.',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'powerup-8bit',
    name: 'Level Up Arp',
    category: 'gaming',
    icon: '⭐',
    tag: 'Arcade',
    duration: '0.8s',
    desc: 'Rapid rising 5-note melodic victory arpeggio.',
    color: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'game-over',
    name: 'Game Over',
    category: 'gaming',
    icon: '💀',
    tag: 'Classic',
    duration: '1.6s',
    desc: 'Sad descending 8-bit minor progression.',
    color: 'from-slate-600 to-slate-900',
  },
  {
    id: 'one-up',
    name: '1-Up Extra Life',
    category: 'gaming',
    icon: '💚',
    tag: 'Retro',
    duration: '0.7s',
    desc: 'Triumphant 6-note bright green extra life melody.',
    color: 'from-green-400 to-emerald-600',
  },
  {
    id: 'laser-pew',
    name: 'Laser Blaster',
    category: 'gaming',
    icon: '🔫',
    tag: 'Sci-Fi',
    duration: '0.3s',
    desc: 'Futuristic high-energy space laser pew pew shot.',
    color: 'from-sky-400 to-cyan-500',
  },
  {
    id: 'victory-fanfare',
    name: 'Victory Fanfare',
    category: 'gaming',
    icon: '🏆',
    tag: 'Win',
    duration: '2.0s',
    desc: 'Golden trumpet triumphant fanfare fanfare chord.',
    color: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'sub-bass',
    name: '808 Sub Bass Drop',
    category: 'impacts',
    icon: '🔊',
    tag: 'Sub',
    duration: '2.0s',
    desc: 'Chest-thumping 808 sub frequency drop from 130Hz to 32Hz.',
    color: 'from-blue-600 to-indigo-900',
  },
  {
    id: 'taiko-drum',
    name: 'Taiko War Drum',
    category: 'impacts',
    icon: '🥁',
    tag: 'Bass',
    duration: '1.4s',
    desc: 'Deep cinematic thunderous war drum thud.',
    color: 'from-red-500 to-amber-700',
  },
  {
    id: 'gong-crash',
    name: 'Temple Gong',
    category: 'impacts',
    icon: '🏮',
    tag: 'Zen',
    duration: '3.2s',
    desc: 'Shimmering metallic bronze gong with long decay.',
    color: 'from-yellow-600 to-amber-800',
  },
  {
    id: 'cartoon-slap',
    name: 'Cartoon Slap',
    category: 'impacts',
    icon: '🖐️',
    tag: 'Comic',
    duration: '0.4s',
    desc: 'Snappy whip-crack cartoon comedy slap.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'punch-hit',
    name: 'Heavy Punch',
    category: 'impacts',
    icon: '🥊',
    tag: 'Fighting',
    duration: '0.5s',
    desc: 'Arcade beat-em-up punch impact with heavy crunch.',
    color: 'from-red-600 to-orange-700',
  },
  {
    id: 'discord-ping',
    name: 'Discord Notification',
    category: 'alerts',
    icon: '💬',
    tag: 'Alert',
    duration: '0.4s',
    desc: 'Familiar crystal clear two-tone marimba chime.',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'success-ding',
    name: 'Crystal Ding',
    category: 'alerts',
    icon: '💎',
    tag: 'Clean',
    duration: '1.2s',
    desc: 'Sparkling high-octave clean achievement chime.',
    color: 'from-teal-400 to-emerald-500',
  },
  {
    id: 'censor-bleep',
    name: 'Censor Bleep',
    category: 'alerts',
    icon: '⛔',
    tag: 'TV Tone',
    duration: '0.7s',
    desc: 'Pure 1000Hz standard television bleep tone.',
    color: 'from-slate-500 to-slate-700',
  },
  {
    id: 'emergency-siren',
    name: 'Emergency Siren',
    category: 'alerts',
    icon: '🚨',
    tag: 'Warning',
    duration: '2.0s',
    desc: 'Wee-woo-wee-woo rapid warning alert siren.',
    color: 'from-rose-600 to-red-700',
  },
  {
    id: 'doorbell',
    name: 'Ding Dong Doorbell',
    category: 'alerts',
    icon: '🚪',
    tag: 'Chime',
    duration: '1.5s',
    desc: 'Traditional warm two-note tubular doorbell.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'camera-shutter',
    name: 'Camera Shutter',
    category: 'voices',
    icon: '📸',
    tag: 'Snap',
    duration: '0.3s',
    desc: 'Mechanical dual click SLR camera snapshot.',
    color: 'from-slate-400 to-zinc-600',
  },
  {
    id: 'pop-bubble',
    name: 'Bubble Pop',
    category: 'voices',
    icon: '🫧',
    tag: 'Satisfying',
    duration: '0.2s',
    desc: 'Ultra satisfying crisp water bubble pop.',
    color: 'from-cyan-300 to-sky-500',
  },
  {
    id: 'dj-scratch',
    name: 'DJ Vinyl Scratch',
    category: 'voices',
    icon: '🎧',
    tag: 'Beats',
    duration: '0.6s',
    desc: 'Fast hip-hop vinyl record rub and pull-back.',
    color: 'from-violet-500 to-purple-700',
  },
  {
    id: 'magic-wand',
    name: 'Magic Wand Sparkle',
    category: 'voices',
    icon: '🪄',
    tag: 'Sparkle',
    duration: '1.3s',
    desc: 'Rising glissando of sparkling celestial fairy dust.',
    color: 'from-fuchsia-400 to-pink-600',
  },
  {
    id: 'applause',
    name: 'Crowd Applause',
    category: 'voices',
    icon: '👏',
    tag: 'Crowd',
    duration: '2.2s',
    desc: 'Roaring audience clapping and cheer celebration.',
    color: 'from-emerald-400 to-green-600',
  },
  {
    id: 'wilhelm-scream',
    name: 'Wilhelm Scream Synth',
    category: 'voices',
    icon: '😱',
    tag: 'Movie',
    duration: '1.2s',
    desc: 'Classic falling movie scream synthesized sweep.',
    color: 'from-orange-600 to-rose-700',
  },
  {
    id: 'evil-laugh',
    name: 'Evil Laugh',
    category: 'voices',
    icon: '😈',
    tag: 'Spooky',
    duration: '1.8s',
    desc: 'Descending sinister goblin chuckle bursts: Muahaha!',
    color: 'from-purple-600 to-violet-900',
  },
  {
    id: 'quack-duck',
    name: 'Rubber Duck Quack',
    category: 'voices',
    icon: '🦆',
    tag: 'Silly',
    duration: '0.5s',
    desc: 'Funny resonant squeeze duck quack sound.',
    color: 'from-yellow-400 to-lime-500',
  },
  {
    id: 'car-horn',
    name: 'Car Honk',
    category: 'voices',
    icon: '🚗',
    tag: 'Honk',
    duration: '0.6s',
    desc: 'Vintage dual-tone beep-beep automobile horn.',
    color: 'from-sky-500 to-cyan-600',
  },
];

// Active Audio Engine State
let audioCtx = null;
let masterGainNode = null;
let masterVolume = 0.85;
let pitchMultiplier = 1.0;
const activeNodes = new Set();

export function getAudioContext() {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioCtx();
    masterGainNode = audioCtx.createGain();
    masterGainNode.gain.setValueAtTime(masterVolume, audioCtx.currentTime);
    masterGainNode.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMasterVolume(val) {
  masterVolume = Math.max(0, Math.min(1, val));
  if (masterGainNode && audioCtx) {
    masterGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGainNode.gain.setValueAtTime(masterVolume, audioCtx.currentTime);
  }
}

export function getMasterVolume() {
  return masterVolume;
}

export function setPitchMultiplier(val) {
  pitchMultiplier = Math.max(0.5, Math.min(2.0, val));
}

export function getPitchMultiplier() {
  return pitchMultiplier;
}

export function stopAllSounds() {
  activeNodes.forEach((node) => {
    try {
      if (node.stop) node.stop();
      if (node.disconnect) node.disconnect();
    } catch (_) {}
  });
  activeNodes.clear();
}

function registerNode(node) {
  activeNodes.add(node);
  if (node.onended !== undefined) {
    const orig = node.onended;
    node.onended = (e) => {
      activeNodes.delete(node);
      if (orig) orig(e);
    };
  }
}

function createNoiseBuffer(ctx, duration = 1.0) {
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

// Synthetic Sound Generators
export function playSyntheticSound(id) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const p = pitchMultiplier;

  switch (id) {
    case 'vine-boom': {
      // Sub Bass Drop + Distortion + Explosive Low Punch
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(105 * p, now);
      osc.frequency.exponentialRampToValueAtTime(32 * p, now + 0.9);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(45, now + 1.1);

      gain.gain.setValueAtTime(1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainNode);

      // Noise punch burst
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 0.4);
      const nFilter = ctx.createBiquadFilter();
      nFilter.type = 'lowpass';
      nFilter.frequency.setValueAtTime(180, now);
      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.9, now);
      nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(nFilter);
      nFilter.connect(nGain);
      nGain.connect(masterGainNode);

      registerNode(osc);
      registerNode(noise);
      osc.start(now);
      noise.start(now);
      osc.stop(now + 1.25);
      noise.stop(now + 0.4);
      break;
    }

    case 'airhorn': {
      // 3 rhythmic blasts: ta-ta-TAAAA
      const blasts = [
        { start: 0, dur: 0.12 },
        { start: 0.16, dur: 0.12 },
        { start: 0.32, dur: 0.75 },
      ];
      // Chord frequencies: Bb4 (466), D5 (587), F5 (698), Bb5 (932)
      const freqs = [466.16, 587.33, 698.46, 932.33];

      blasts.forEach((b) => {
        const t = now + b.start;
        freqs.forEach((baseF) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(baseF * p, t);
          // slight stadium bend
          osc.frequency.linearRampToValueAtTime(baseF * 1.02 * p, t + b.dur);

          gain.gain.setValueAtTime(0.18, t);
          gain.gain.setValueAtTime(0.18, t + b.dur - 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, t + b.dur);

          osc.connect(gain);
          gain.connect(masterGainNode);
          registerNode(osc);
          osc.start(t);
          osc.stop(t + b.dur + 0.05);
        });
      });
      break;
    }

    case 'metal-pipe': {
      // Resonant inharmonic metallic modes ringing out
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 0.15);
      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.8, now);
      nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      noise.connect(nGain);
      nGain.connect(masterGainNode);
      registerNode(noise);
      noise.start(now);

      const modes = [480, 890, 1420, 2150, 3450, 4800];
      modes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * p, now);

        const decay = 0.6 + idx * 0.2;
        gain.gain.setValueAtTime(0.3 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(now);
        osc.stop(now + decay);
      });
      break;
    }

    case 'bruh': {
      // Formant synthesis for "bruh" (falling vowel /uh/)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const f1 = ctx.createBiquadFilter();
      const f2 = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130 * p, now);
      osc.frequency.exponentialRampToValueAtTime(80 * p, now + 0.65);

      // Formants for /ʌ/ /ə/ sound
      f1.type = 'bandpass';
      f1.frequency.setValueAtTime(600 * p, now);
      f1.Q.setValueAtTime(5, now);

      f2.type = 'bandpass';
      f2.frequency.setValueAtTime(1100 * p, now);
      f2.Q.setValueAtTime(6, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.7, now + 0.08);
      gain.gain.setValueAtTime(0.65, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(f1);
      f1.connect(gain);
      osc.connect(f2);
      f2.connect(gain);
      gain.connect(masterGainNode);

      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.75);
      break;
    }

    case 'taco-bell': {
      // Deep tubular bell chime with long shimmer
      const harmonics = [
        { f: 220, amp: 0.6, d: 2.8 },
        { f: 607, amp: 0.45, d: 2.2 },
        { f: 895, amp: 0.35, d: 1.8 },
        { f: 1205, amp: 0.25, d: 1.4 },
        { f: 1740, amp: 0.15, d: 1.0 },
      ];
      harmonics.forEach((h) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(h.f * p, now);

        gain.gain.setValueAtTime(h.amp, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + h.d);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(now);
        osc.stop(now + h.d);
      });
      break;
    }

    case 'sad-trombone': {
      // 4 descending tones: D4 (293.66), C#4 (277.18), C4 (261.63), B3 (246.94 -> 210 sad bend)
      const notes = [
        { f: 293.66, t: 0.0, d: 0.45 },
        { f: 277.18, t: 0.48, d: 0.45 },
        { f: 261.63, t: 0.96, d: 0.45 },
        { f: 246.94, t: 1.44, d: 0.85, bend: 210 },
      ];
      notes.forEach((n) => {
        const startTime = now + n.t;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.f * p, startTime);
        if (n.bend) {
          osc.frequency.linearRampToValueAtTime(n.bend * p, startTime + n.d);
        }

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, startTime);

        gain.gain.setValueAtTime(0.01, startTime);
        gain.gain.linearRampToValueAtTime(0.35, startTime + 0.05);
        gain.gain.setValueAtTime(0.3, startTime + n.d - 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + n.d);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainNode);

        registerNode(osc);
        osc.start(startTime);
        osc.stop(startTime + n.d + 0.05);
      });
      break;
    }

    case 'fart-reverb': {
      // Low modulated buzz + bubbly resonance
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(95 * p, now);
      osc.frequency.linearRampToValueAtTime(55 * p, now + 0.8);

      // Low frequency modulation for flutter
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(28, now);
      lfoGain.gain.setValueAtTime(30, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + 0.85);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(140, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainNode);

      registerNode(osc);
      osc.start(now);
      osc.stop(now + 1.3);
      break;
    }

    case 'anime-wow': {
      // Rising sweet pitch sweep: 550Hz -> 1150Hz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520 * p, now);
      osc.frequency.exponentialRampToValueAtTime(1180 * p, now + 0.6);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.5, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.95);
      break;
    }

    case 'buzzer-wrong': {
      // Two harsh red buzzer pulses
      [0, 0.35].forEach((offset) => {
        const t = now + offset;
        [140, 147].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq * p, t);

          gain.gain.setValueAtTime(0.28, t);
          gain.gain.setValueAtTime(0.25, t + 0.22);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

          osc.connect(gain);
          gain.connect(masterGainNode);
          registerNode(osc);
          osc.start(t);
          osc.stop(t + 0.28);
        });
      });
      break;
    }

    case 'emotional-damage': {
      // Dramatic orchestral stab: C minor chord with heavy brass
      const freqs = [130.81, 155.56, 196.0, 261.63, 311.13, 392.0];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f * p, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(now);
        osc.stop(now + 1.0);
      });
      break;
    }

    case 'coin-8bit': {
      // B5 (987.77) for 0.08s -> E6 (1318.51) for 0.35s
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77 * p, now);
      osc.frequency.setValueAtTime(1318.51 * p, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.setValueAtTime(0.25, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.48);
      break;
    }

    case 'jump-8bit': {
      // Classic sweep 140Hz -> 620Hz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140 * p, now);
      osc.frequency.exponentialRampToValueAtTime(640 * p, now + 0.16);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.22);
      break;
    }

    case 'powerup-8bit': {
      // Rapid ascending 5 notes: C5, E5, G5, C6, E6
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq * p, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(t);
        osc.stop(t + 0.22);
      });
      break;
    }

    case 'game-over': {
      // Sad minor arpeggio: C5 -> G4 -> Eb4 -> C4 (low)
      const notes = [523.25, 392.0, 311.13, 261.63];
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.22;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq * p, t);
        if (idx === 3) {
          osc.frequency.linearRampToValueAtTime(220 * p, t + 0.6);
        }

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + (idx === 3 ? 0.7 : 0.25));

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(t);
        osc.stop(t + (idx === 3 ? 0.75 : 0.28));
      });
      break;
    }

    case 'one-up': {
      // 6-note high energy arcade chime
      const notes = [330, 392, 659, 523, 587, 784];
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.08;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq * p, t);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(t);
        osc.stop(t + 0.24);
      });
      break;
    }

    case 'laser-pew': {
      // High sci-fi drop: 2400Hz -> 80Hz in 0.18s
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400 * p, now);
      osc.frequency.exponentialRampToValueAtTime(80 * p, now + 0.18);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.25);
      break;
    }

    case 'victory-fanfare': {
      // Triumphant trumpet fanfare triad: G4, C5, E5, G5 sustained
      const notes = [
        { f: 392.0, t: 0, d: 0.15 },
        { f: 523.25, t: 0.16, d: 0.15 },
        { f: 659.25, t: 0.32, d: 0.15 },
        { f: 783.99, t: 0.48, d: 1.2 },
      ];
      notes.forEach((n) => {
        const t = now + n.t;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f * p, t);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(t);
        osc.stop(t + n.d + 0.05);
      });
      break;
    }

    case 'sub-bass': {
      // 808 Sub drop from 135Hz to 32Hz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(135 * p, now);
      osc.frequency.exponentialRampToValueAtTime(32 * p, now + 1.8);

      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 2.1);
      break;
    }

    case 'taiko-drum': {
      // Deep war drum impact
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180 * p, now);
      osc.frequency.exponentialRampToValueAtTime(45 * p, now + 0.35);

      gain.gain.setValueAtTime(1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 1.2);

      // Noise click transient
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 0.1);
      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.4, now);
      nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      noise.connect(nGain);
      nGain.connect(masterGainNode);
      registerNode(noise);
      noise.start(now);
      break;
    }

    case 'gong-crash': {
      // Temple gong with shimmering harmonics
      const freqs = [180, 290, 470, 780, 1150];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f * p, now);

        const dur = 2.8 - idx * 0.3;
        gain.gain.setValueAtTime(0.3 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(now);
        osc.stop(now + dur);
      });
      break;
    }

    case 'cartoon-slap': {
      // Snappy whip crack noise burst
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 0.2);
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainNode);
      registerNode(noise);
      noise.start(now);
      break;
    }

    case 'punch-hit': {
      // Heavy arcade punch
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 * p, now);
      osc.frequency.exponentialRampToValueAtTime(50 * p, now + 0.2);

      gain.gain.setValueAtTime(0.85, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    }

    case 'discord-ping': {
      // D6 (1174.66) then A5 (880)
      [
        { f: 1174.66, t: 0, d: 0.25 },
        { f: 880.0, t: 0.12, d: 0.3 },
      ].forEach((n) => {
        const t = now + n.t;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f * p, t);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(t);
        osc.stop(t + n.d + 0.05);
      });
      break;
    }

    case 'success-ding': {
      // Sparkling achievement crystal
      [
        { f: 1046.5, t: 0, d: 1.1 },
        { f: 2093.0, t: 0, d: 0.8 },
      ].forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f * p, now);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.d);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(now);
        osc.stop(now + n.d);
      });
      break;
    }

    case 'censor-bleep': {
      // 1000Hz pure TV tone for 0.65s
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000 * p, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.setValueAtTime(0.3, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.68);
      break;
    }

    case 'emergency-siren': {
      // Rapid alternating wee-woo alert
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(3.5, now);
      lfoGain.gain.setValueAtTime(200 * p, now);
      lfo.connect(osc.frequency);
      osc.frequency.setValueAtTime(750 * p, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      registerNode(lfo);
      lfo.start(now);
      osc.start(now);
      lfo.stop(now + 1.9);
      osc.stop(now + 1.9);
      break;
    }

    case 'doorbell': {
      // Ding-Dong: E5 (659.25) -> C5 (523.25)
      [
        { f: 659.25, t: 0, d: 0.8 },
        { f: 523.25, t: 0.5, d: 1.2 },
      ].forEach((n) => {
        const t = now + n.t;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f * p, t);

        gain.gain.setValueAtTime(0.38, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + n.d);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(t);
        osc.stop(t + n.d);
      });
      break;
    }

    case 'camera-shutter': {
      // Two mechanical snap clicks
      [0, 0.09].forEach((offset) => {
        const t = now + offset;
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer(ctx, 0.05);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        noise.connect(gain);
        gain.connect(masterGainNode);
        registerNode(noise);
        noise.start(t);
      });
      break;
    }

    case 'pop-bubble': {
      // Quick water bubble pop: 260Hz -> 860Hz in 0.07s
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260 * p, now);
      osc.frequency.exponentialRampToValueAtTime(860 * p, now + 0.07);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.14);
      break;
    }

    case 'dj-scratch': {
      // Vinyl scratch frequency sweeps
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320 * p, now);
      osc.frequency.linearRampToValueAtTime(1400 * p, now + 0.15);
      osc.frequency.linearRampToValueAtTime(280 * p, now + 0.32);
      osc.frequency.linearRampToValueAtTime(1100 * p, now + 0.45);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.6);
      break;
    }

    case 'magic-wand': {
      // Rising sparkle harp arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0];
      notes.forEach((f, idx) => {
        const t = now + idx * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f * p, t);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(t);
        osc.stop(t + 0.55);
      });
      break;
    }

    case 'applause': {
      // Crowd clapping modulated noise bursts
      for (let i = 0; i < 16; i++) {
        const t = now + i * 0.12 + Math.random() * 0.05;
        const noise = ctx.createBufferSource();
        noise.buffer = createNoiseBuffer(ctx, 0.12);
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400 + Math.random() * 800, t);
        filter.Q.setValueAtTime(2, t);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainNode);
        registerNode(noise);
        noise.start(t);
      }
      break;
    }

    case 'wilhelm-scream': {
      // Classic sliding scream sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(850 * p, now);
      osc.frequency.exponentialRampToValueAtTime(280 * p, now + 0.95);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
      gain.gain.setValueAtTime(0.35, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 1.05);
      break;
    }

    case 'evil-laugh': {
      // Descending chuckle pulses: Ha-Ha-Ha-Ha!
      [420, 360, 300, 240].forEach((freq, idx) => {
        const t = now + idx * 0.22;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq * p, t);
        osc.frequency.linearRampToValueAtTime(freq * 0.85 * p, t + 0.18);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(t);
        osc.stop(t + 0.22);
      });
      break;
    }

    case 'quack-duck': {
      // Squeaky duck quack
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240 * p, now);
      osc.frequency.linearRampToValueAtTime(170 * p, now + 0.35);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.linearRampToValueAtTime(450, now + 0.35);
      filter.Q.setValueAtTime(7, now);

      gain.gain.setValueAtTime(0.65, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.42);
      break;
    }

    case 'car-horn': {
      // Vintage dual-tone horn (370Hz and 415Hz)
      [370, 415].forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f * p, now);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.setValueAtTime(0.35, now + 0.45);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc.connect(gain);
        gain.connect(masterGainNode);
        registerNode(osc);
        osc.start(now);
        osc.stop(now + 0.6);
      });
      break;
    }

    default: {
      // Universal pleasant feedback chime if unknown
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600 * p, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(masterGainNode);
      registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.35);
      break;
    }
  }
}
