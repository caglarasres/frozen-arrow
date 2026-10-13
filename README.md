# Vak! – Ördek Nerede? 🦆

Mobil (iOS + Android) hidden object oyunu: siyah-beyaz sahnelerde lastik ördekleri bul, bulduğun ördekler renklensin. Bütün plan için bkz. [`PLAN.md`](PLAN.md).

**Durum:** Prototip (M1). Seviye 1 "Köpüklü Küvet" oynanabilir.

## Prototipte neler var
- Telefona göre dikey sahne; iki parmakla yakınlaştırma, sürükleyerek gezme, çift dokunarak zoom, masaüstünde fare tekerleği
- Ördeğe dokununca: renklenme efekti, "vak" sesi, kabarcıklar, titreşim, üst bardaki sayaç
- Yanlış dokunuşa ceza yok (sadece küçük bir dalga efekti)
- 💡 İpucu: ördeğin tam yerini değil bölgesini gösterir; başta 3 ipucu var, her biten seviye +1 verir
- ✨ Gizli altın ördek (bonus)
- Bitince: kamera uzaklaşır, sahnenin tamamı renklenir, yıldız ekranı çıkar (⭐ bitir, ⭐⭐ ipucusuz, ⭐⭐⭐ ipucusuz + altın ördek)
- İlerleme ve ipuçları cihazda saklanır

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:5173 (telefondan aynı ağdaki IP ile açılabilir)
npm run build      # dist/ klasörüne üretim derlemesi
```

### Telefonda (Capacitor)

```bash
npm run cap:sync          # derler ve web dosyalarını native projelere kopyalar
npx cap open android      # Android Studio'da açar → Run
npx cap open ios          # Xcode'da açar (sadece macOS) → Run
```

Uygulama dikey moda kilitli. Paket kimliği: `game.vak.ordeknerede` (`capacitor.config.ts`).

## Sahne üretimi

Seviye 1'in çizimi `tools/build-level1.mjs` ile kodla üretiliyor. Tek bir kaynaktan iki dosya çıkıyor:
- `art/world-1/level-01/line.svg`: oyunun siyah-beyaz hali
- `art/world-1/level-01/color.svg`: renkli hali

Script ayrıca ördek konumlarını `levels/levels.json` dosyasına yazıyor.

```bash
npm run art
```

Sonraki seviyeler çizerlerin hazırladığı SVG'lerle gelecek. Kurallar için bkz. [`art/README.md`](art/README.md).

## Klasörler

```
src/
  main.ts            # giriş noktası
  game/level.ts      # seviye: sahne, dokunma, renklendirme, ipucu, bitiş
  game/camera.ts     # yakınlaştırma / kaydırma
  game/input.ts      # dokunmatik + fare girişi
  game/audio.ts      # WebAudio ile ses efektleri + titreşim
  game/storage.ts    # ilerleme kaydı
  ui/hud.ts          # üst bar, öğretici kart, sonuç ekranı
art/                 # sahne görselleri
levels/levels.json   # seviye verisi
tools/               # sahne üretim scriptleri
android/ ios/        # Capacitor native projeler
research/            # araştırma ve pazar analizi
```
