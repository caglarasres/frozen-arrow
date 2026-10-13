# Sanat varlıkları

Stil kurallarının tamamı [`PLAN.md` § 3](../PLAN.md#3-sanat-yönü-basit-çizimler) bölümünde.

## Kısa kurallar
- Siyah çizgi, tek kalınlık (2048 px'lik sahnede 4–6 px), uçlar yuvarlak. Gölge ve tarama yok.
- Renkli versiyon: aynı çizgiler + düz pastel renkler, sahne başına en fazla 6–8 renk.
- Kapibara rengi: `#A0703C` (açık tonu `#C89A63`).
- Kapibaranın en az %30'u görünür olmalı. %100 zoom'da en küçük boyut 40 px.

## Her seviye klasörü
```
world-N/level-XX/
  line.svg     # kaynak, siyah-beyaz
  color.svg    # kaynak, renkli (aynı çizgiler)
  line.webp    # oyunda kullanılan, 2048×1536
  color.webp   # oyunda kullanılan, 2048×1536
```

## characters/
Kapibara poz kütüphanesi: `side.svg`, `sleep.svg`, `head-water.svg`, `orange.svg`, `ears.svg`, `back.svg`, `window.svg`, `silhouette.svg`, `costume.svg`, `baby.svg`, `reflection.svg`, `golden.svg`.
