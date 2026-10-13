# Sanat varlıkları

Stil kurallarının tamamı [`PLAN.md` § 5](../PLAN.md#5-sanat-yönü-basit-çizimler) bölümünde.

## Kısa kurallar
- Siyah çizgi, tek kalınlık (2048 px'lik sahnede 4–6 px), uçlar yuvarlak. Gölge ve tarama yok.
- Renkli versiyon: aynı çizgiler + düz pastel renkler, sahne başına 6–8 renk.
- Ördek renkleri: gövde `#FFD23F`, gölge `#F2B705`, gaga `#FF8C42`. **Ördek sarısı sahnenin geri kalanında kullanılmaz.**
- Ördeğin en az %30'u görünür olmalı (gaga veya göz dahil). %100 zoom'da en küçük boyut 40 px.

## Her seviye klasörü
```
world-N/level-XX/
  line.svg     # kaynak, siyah-beyaz (ördekler dahil)
  color.svg    # kaynak, renkli (aynı çizgiler)
  line.webp    # oyunda kullanılan, 2048×1536
  color.webp   # oyunda kullanılan, 2048×1536
  empty.webp   # (hideable seviyeler) ördeksiz versiyon, Sakla & Gönder için
```

## characters/
Ördek poz kütüphanesi: `side.svg`, `front.svg`, `head.svg`, `tail.svg`, `upside-down.svg`, `ornament.svg`, `costume.svg`, `baby.svg`, `silhouette.svg`, `reflection.svg`, `pattern.svg`, `golden.svg`.
