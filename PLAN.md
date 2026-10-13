# Kapibara Nerede? – Oyun Planı (v0.1)

Find the Cat 2 tarzında bir hidden object oyunu. Saklanan hayvan kedi değil kapibara. Çizimler basit tutulacak: siyah çizgi + düz renk. Arka plan araştırması için bkz. [`research/README.md`](research/README.md).

Çalışma adı: **Kapibara Nerede?** (İngilizce: *Where's the Capy?*). "Find The Capybara" adı App Store'da kullanılıyor, o yüzden farklı bir isim seçmeliyiz.

---

## 1. Pazar ve rakipler

| Oyun | Ne yapıyor | Bizim farkımız |
|---|---|---|
| [Find The Capybara: Seek & Spy](https://apps.apple.com/us/app/id6739583941) (iPad, ücretsiz + IAP) | El çizimi sahnelerde kapibara arama, doğrudan rakip. Uygulama 323 MB ve takip eden reklam kullanıyor. | Hafif (web tabanlı, < 30 MB), agresif reklam yok, sahne bitince renklenme ödülü |
| [Erase to Find Capybara](https://apps.apple.com/lc/app/erase-to-find-capybara/id6752536011) | Arka planı silerek kapibarayı ortaya çıkarma | Farklı bir mekanik; ileride bir "silgi" mini modu olarak eklenebilir |
| [Capybara Match!](https://apps.apple.com/us/app/-/id6742401525) | Match-3 + hidden object karışımı | Biz saf ve rahatlatıcı hidden object'e odaklanıyoruz |
| [Hidden Capybaras with Orange](https://ec.nintendo.com/apps/0100B29022FCE000/US) (Switch) | Gündüz/gece seviyeleri olan kapibara hidden object oyunu | Mobil ve web'de olmak, günlük mod |

- Kapibara teması popüler: Habby'nin [Capybara Go!](https://appgrowing.net/blog/capybara-go) oyunu bazı ülkelerde iOS hasılat ilk 10'una girdi. Ama sadece temayla yetinen oyunlar, yenilik etkisi geçince oyuncu kaybediyor ([Capybara Run analizi](https://marlvel.ai/apps/capybara-run)). Yani sadece temaya güvenmek yetmez, sahneler ve içerik çeşitli olmalı.
- Find the Cat türünde en çok övülen şey minimalist çizim, en çok şikayet edilen şey tekrarlayan sahneler ve fazla reklam ([research](research/README.md)).

## 2. Oyunun özü

> Sakin, şirin, "bir tane daha seviye" dedirten bir arama oyunu. Siyah-beyaz bir sahnede kapibaraları bul; her bulduğun kapibara renklenir, hepsini bulunca bütün sahne renklenir.

### Temel döngü
1. Seviye açılır: siyah-beyaz çizgi sahne ve "0 / N kapibara" sayacı.
2. Oyuncu sahneyi kaydırır ve yakınlaştırır (pinch, tekerlek, çift dokunma).
3. Kapibaraya dokununca: kapibara renklenir, "pıt" sesi çalar, küçük kalpler çıkar, sayaç artar.
4. Yanlış dokunuşa ceza yok. Sadece ufak bir dalga efekti gösterilir.
5. Hepsi bulununca sahne renkli versiyona geçer (yumuşak bir geçiş), yıldızlar verilir ve sonraki seviye açılır.

### Yıldız sistemi (ceza yerine ödül)
- ⭐ seviyeyi bitirmek
- ⭐⭐ ipucu kullanmadan bitirmek
- ⭐⭐⭐ ipucusuz bitirip **altın kapibarayı** da bulmak (her seviyede 1 tane, opsiyonel)

### İpucu
- Kapibaranın olduğu bölgede 3 saniye boyunca yanıp sönen bir daire gösterilir. Kesin noktayı değil, bölgeyi gösterir.
- Oyuncuya başta 3 ipucu verilir. Her biten seviye +1 ipucu kazandırır. Reklam izlemek isteğe bağlıdır ve +2 ipucu verir.

## 3. Sanat yönü (BASİT çizimler)

### Stil kuralları
- **Çizgi:** Tek kalınlıkta siyah çizgi (2048 px'lik sahnede 4–6 px), uçlar yuvarlak. Tarama ve gölge yok.
- **Renkli katman:** Düz renkler, sahne başına en fazla 6–8 renklik pastel bir palet. Gradyan yok.
- **Format:** Önce SVG çizilir, oyun için PNG/WebP'ye çevrilir (2048×1536 yatay veya 1536×2048 dikey).
- **Araçlar:** Inkscape (ücretsiz), Krita veya Procreate. Aynı çizgi stilini korumak için tek bir fırça preset'i kullanılır.

### Kapibara karakteri
Kapibara sadece birkaç basit şekilden oluşur. Bu hem çizmeyi hem saklamayı kolaylaştırır:
- Gövde: yatık, yuvarlatılmış bir dikdörtgen ("ekmek somunu").
- Kafa: önde kare burun, iki küçük nokta göz, iki minik yuvarlak kulak.
- Bacaklar: 4 kısa çizgi (çoğu pozda görünmez).
- Renk: kahverengi (#A0703C), açık tonu #C89A63.

### Poz kütüphanesi
Tekrar kullanılacak 10–12 poz çizilir ve her seviyede bunlar ölçeklenip döndürülerek kullanılır:

| # | Poz | Saklama fikri |
|---|---|---|
| 1 | Yan profil, ayakta | Taşların, kütüklerin arasında |
| 2 | Yatmış, uyuyor | Ekmek, patates, saman balyası gibi benzer şekillerin arasında |
| 3 | Sadece kafa (sudan çıkmış) | Kaplıca, göl, küvet |
| 4 | Kafasında portakal 🍊 (meme) | Meyve tezgahında |
| 5 | Sadece kulaklar ve gözler | Çalı veya çim arkasında |
| 6 | Arkadan, popo | Kapıdan veya kutudan çıkmış |
| 7 | Pencereden bakan | Bina cepheleri |
| 8 | Siluet / gölge | Perde arkası, gece sahneleri |
| 9 | Şapkalı / kostümlü | Kalabalıklar, festival |
| 10 | Mini kapibara (yavru) | Zor seviyelerde küçük boyutlu |
| 11 | Yansıma | Su birikintisi, ayna |
| 12 | Altın kapibara | Her seviyede 1 tane, en zor yerde |

### Saklama kuralları (adil zorluk)
- Kapibaranın **en az %30'u** her zaman görünür olmalı.
- %100 zoom'da en küçük kapibara 40 px'den küçük olmamalı. Mobilde dokunma alanı en az 44 pt olmalı.
- Benzer şekilli "tuzak" objeler (taş, ekmek, kütük) kullanılabilir, ama kapibarayı her zaman yüz (göz + burun) ele vermeli.
- Bütün kapibaralar aynı bölgeye yığılmamalı. Sahne 3×3 ızgaraya bölünür ve her hücreye en fazla N/4 kapibara konur.

## 4. Dünyalar ve seviyeler (v1.0: 5 dünya × 6 seviye = 30 seviye)

Zorluk eğrisi: ilk seviye öğretici olmalı ve zorluk ani sıçramadan, yavaşça artmalı ([kaynak](https://vocal.media/gamers/things-to-keep-in-mind-while-making-a-hidden-object-game)). Zorluk üç şekilde artar: kapibara sayısı, sahne yoğunluğu ve saklama türü.

| Dünya | Tema | Seviyeler | Kapibara sayısı | Yeni saklama türü |
|---|---|---|---|---|
| 1 | 🌿 **Nehir Kenarı** (kapibaranın evi) | 1–6 | 5 → 12 | Açıkta, taş ve çalı arkası |
| 2 | ♨️ **Kaplıca Kasabası** (Japon onsen) | 7–12 | 10 → 18 | Sadece kafalar, buhar arkası |
| 3 | 🏙️ **Büyük Şehir** (İstanbul esintili) | 13–18 | 15 → 24 | Pencereler, kalabalık, şapkalı kapibara |
| 4 | 🍊 **Pazar & Mutfak** | 19–24 | 18 → 28 | Ekmek, patates, meyve gibi benzer şekillerin arasında |
| 5 | 🌙 **Gece Festivali** | 25–30 | 22 → 35 | Siluetler, fenerler, yansımalar |

Her dünyanın son seviyesi büyük ve "boss" seviyesidir: sahne 2 kat genişliğinde olur ve daha çok kapibara içerir.

### Seviye 1–6 ayrıntısı (ilk prototip içeriği)

| Seviye | Sahne | Kapibara | Not |
|---|---|---|---|
| 1 | Sığ nehir, 3 taş, 1 ağaç | 5 | Öğretici: dokunma ve zoom'u gösterir, kapibaralar açıkta |
| 2 | Nehir + saz kamışları | 6 | İlk kısmi saklanma (kamış arkası) |
| 3 | Kumsal ve kütükler | 8 | Kütüklerle benzer şekil tuzağı |
| 4 | Ördekli gölet | 9 | İlk "sadece kafa" kapibara |
| 5 | Ormandaki piknik alanı | 10 | Sepet ve battaniye altında |
| 6 | **Boss:** Nehir boyunca panorama | 12 | Geniş sahne, altın kapibara burada tanıtılır |

### İçerik sonrası (v1.1+)
- **Günlük mod:** Her gün tek bir küçük sahne ve 8 kapibara. Seri (streak) takibi yapılır.
- **Sezonluk paketler:** Cadılar Bayramı, Yılbaşı, Ramazan/Bayram, yaz.
- **Kapibara Albümü:** Bulunan özel kapibaralar (şapkalı, portakallı, altın) bir koleksiyon defterine eklenir.
- **Silgi modu:** Erase to Find benzeri bir mini oyun.

## 5. Teknik plan

### Teknoloji
- **TypeScript + Vite + PixiJS v8.** PixiJS zoom/pan ve maskeli renklendirme için hızlı ve hafif.
- **Mobil:** Capacitor ile iOS ve Android'e paketlenecek. Web sürümü GitHub Pages'te yayınlanacak.
- **Kayıt:** İlerleme `localStorage` / Capacitor Preferences içinde tutulacak.

### Renklendirme tekniği
Her seviyede iki görsel olur: `line.webp` (siyah-beyaz) ve `color.webp` (renkli, aynı çizgilerle).
- Bir kapibara bulununca, renkli katmandan o kapibaranın şekli maske olarak açılır. Maske çember ya da poligon olabilir.
- Seviye bitince renkli katman bütün sahne için 1 saniyede görünür hale getirilir.

### Seviye veri formatı
Örnek dosya: [`levels/levels.json`](levels/levels.json)
```json
{
  "id": "w1-l01",
  "world": 1,
  "name": "Sığ Nehir",
  "size": [2048, 1536],
  "line": "art/world-1/level-01/line.webp",
  "color": "art/world-1/level-01/color.webp",
  "capybaras": [
    { "id": 1, "x": 512, "y": 780, "r": 48, "pose": "side" }
  ],
  "golden": { "x": 1800, "y": 300, "r": 30 }
}
```

### Seviye editörü (ilk iş!)
Tarayıcıda çalışan basit bir sayfa (`/editor`):
1. `line.webp` yüklenir.
2. Sahneye tıklanarak kapibara noktası eklenir; tekerlekle yarıçap ayarlanır.
3. Kontroller: en az 40 px şartı, 3×3 dağılım uyarısı.
4. Sonuç JSON olarak dışa aktarılır.

### Klasör yapısı
```
art/                  # sahne görselleri (bkz. art/README.md)
  characters/         # kapibara poz kütüphanesi (SVG)
  world-1/level-01/   # line.svg, color.svg, line.webp, color.webp
levels/levels.json    # bütün seviyelerin verisi
src/                  # oyun kodu (TypeScript)
  scenes/             # Menu, WorldMap, Level, Result
  editor/             # seviye editörü
research/             # araştırma ve referanslar
```

## 6. Yol haritası

| Aşama | Süre | Çıktı |
|---|---|---|
| **M0 – Hazırlık** | 1 hafta | Kapibara poz kütüphanesi (12 SVG), stil rehberi, renk paletleri |
| **M1 – Prototip** | 2 hafta | Zoom/pan, dokunarak bulma, sayaç, renklenme; Seviye 1–3 + seviye editörü |
| **M2 – Dikey dilim** | 2 hafta | Dünya 1 tamamen bitmiş (6 seviye), ses, ipucu, yıldızlar, menü/harita; arkadaşlarla test |
| **M3 – İçerik** | 4–6 hafta | Dünya 2–5 (24 seviye). Her seviye için çizim yaklaşık 1–2 gün, yerleştirme yarım gün |
| **M4 – Mobil** | 2 hafta | Capacitor paketi, ödüllü reklam, IAP, mağaza görselleri |
| **M5 – Yayın** | – | Web (GitHub Pages) + Google Play, sonra App Store |

## 7. Para kazanma
- Ücretsiz oyun. **Zorunlu geçiş reklamı yok**, sadece isteğe bağlı ödüllü reklam (ipucu için).
- IAP: Reklamsız paket + 20 ipucu ($2.99), ipucu paketleri, tema paketleri ($0.99–1.99).
- İleride düşünülebilir: Agave'nin "Cat Club"ı gibi bir abonelik (günlük modda ekstra sahneler).

## 8. Riskler
| Risk | Önlem |
|---|---|
| Çizim üretimi yavaş kalabilir | Poz kütüphanesini ve tekrar kullanılabilir sahne parçalarını (ağaç, taş, bina) önceden hazırlamak |
| Tekrarlayan hissi | Her dünyada yeni bir saklama türü ve farklı paletler |
| Adil olmayan zorluk | Saklama kuralları, editördeki otomatik kontroller, test oyuncuları |
| İsim ve marka çakışması | Mağazada isim araştırması (M4'ten önce) |

## 9. Hemen sonraki adımlar
1. [ ] Kapibara poz kütüphanesini çiz (`art/characters/`).
2. [ ] Seviye 1 sahnesini çiz (line + color).
3. [ ] Vite + PixiJS projesini kur, zoom/pan prototipini yap.
4. [ ] Seviye editörünü yap ve Seviye 1'in kapibaralarını yerleştir.
