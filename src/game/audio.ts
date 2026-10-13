// Ses dosyası olmadan, WebAudio ile üretilen basit efektler.
let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** İlk kullanıcı hareketinde çağrılır (mobil tarayıcılar sesi ancak o zaman açar). */
export function unlockAudio(): void {
  ac();
}

export function quack(pitch = 1): void {
  const a = ac();
  if (!a) return;
  const t = a.currentTime;
  const osc = a.createOscillator();
  const filter = a.createBiquadFilter();
  const gain = a.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(620 * pitch, t);
  osc.frequency.exponentialRampToValueAtTime(330 * pitch, t + 0.16);
  filter.type = 'bandpass';
  filter.frequency.value = 1300;
  filter.Q.value = 3;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.35, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
  osc.connect(filter).connect(gain).connect(a.destination);
  osc.start(t);
  osc.stop(t + 0.22);
}

export function softTick(): void {
  const a = ac();
  if (!a) return;
  const t = a.currentTime;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, t);
  gain.gain.setValueAtTime(0.08, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
  osc.connect(gain).connect(a.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}

export function chime(notes = [523, 659, 784, 1047]): void {
  const a = ac();
  if (!a) return;
  notes.forEach((f, i) => {
    const t = a.currentTime + i * 0.11;
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = 'triangle';
    osc.frequency.value = f;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    osc.connect(gain).connect(a.destination);
    osc.start(t);
    osc.stop(t + 0.45);
  });
}

/** Hafif titreşim. Capacitor Haptics eklentisi eklenince burası ona bağlanacak. */
export function haptic(ms = 15): void {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* desteklenmiyor */
  }
}
