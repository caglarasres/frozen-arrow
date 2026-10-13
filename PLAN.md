# Vak! – Ördek Nerede? · Oyun Planı (v0.2)

Find the Cat 2 tarzında bir hidden object oyunu. Saklanan hayvan **lastik ördek** 🦆. Çizimler basit tutulacak: siyah çizgi + düz renk. Pazar araştırmasından çıkan ayrışma noktaları (reklamsız oyun, "Sakla & Gönder", günlük bulmaca, önce web) oyunun temeline konuldu.

- Arka plan araştırması: [`research/README.md`](research/README.md)
- Pazar araştırması ve strateji: [`research/MARKET.md`](research/MARKET.md)

Çalışma adı: **Vak! – Ördek Nerede?** (İngilizce: *Quack! Where's the Duck?*). "Find The Ducks" (mobil) ve "Ducks in Disguise" (Steam) adları kullanılıyor. M4'ten önce mağazada isim kontrolü yapılacak.

---

## 1. Neden ördek?

- **Siluet çok ikonik:** Kafa, gaga ve kuyruktan oluşan şekil, %30'u görünse bile tanınır.
- **"Obje gibi" saklanabilir:** Lastik ördek bir oyuncak olduğu için her yere konabilir: küvet, raf, pasta süsü, şapka, avize, kitaplık. Find The Cat 2'nin popüler "süs gibi saklanmış kedi" trendi, ördekte doğal olarak var.
- **Kolay çizilir:** 3 basit şekil. Tek renk (sarı) bulunduğunda çok net renklenir.
- **Herkes tanır**, kültürel riski yok, her yaşa uygun.
- **"Ördek arkadaşlar":** Sahnelerde gerçek ördeklerle (ana ördek, yavrular) ve kostümlü ördeklerle çeşitlilik sağlanır.

### Ördek rakipleri (dürüst durum)
| Oyun | Platform | Ne yapıyor |
|---|---|---|
| [Ducks in Disguise](https://ladiesgamers.com/ducks-in-disguise-review/) (Dinomore Games, 2026) | Steam, [Switch](https://www.nintendo.com/games/detail/ducks-in-disguise-switch) | Siyah-beyaz sahnelerde lastik ördek arama, 24 seviye, süre yok, $1.99. **Bize en yakın rakip.** |
| [Find The Ducks](https://apps.apple.com/app/id6745335890) | iOS/Android | Ücretsiz + IAP, Find the Cat klonu |
| [Find 100 Ducks and Blast Them](https://www.dekudeals.com/items/find-100-ducks-and-blast-them) | Steam (F2P) | 3D, ördekleri vurma |
| [Quck My Duck](https://clirgo.itch.io/quck-my-duck) | itch.io / Steam (geliştirme aşamasında) | – |
| "Hide a rubber duck" parti oyunu | Steam (2026'da çıkacak) | 8 kişilik çok oyunculu saklambaç |

**Sonuç:** Sadece "ördekli Find the Cat" yaparsak Ducks in Disguise ve klonlardan ayrışamayız. Farkımız aşağıdaki 5 özellik olmalı.

---

## 2. Ayrışma noktaları (pazar araştırmasından)

| # | Özellik | Hangi açığı kapatıyor | Rakiplerde var mı? |
|---|---|---|---|
| 1 | **🚫 Zorunlu reklam yok** | Türün 1 numaralı şikayeti reklam ve çalışmayan "reklamı kaldır" satın alımı | Mobil rakiplerin çoğunda yok |
| 2 | **🔗 Sakla & Gönder (UGC)** | Viral döngü, reklam bütçesine gerek kalmaz. Gerçek zamanlı ya da sosyal bir hidden object mobil oyunu bulamadık | Yok |
| 3 | **📅 Günlük ördek bulmacası + Wordle tarzı sonuç kartı** | Agave'nin asıl tutundurma motoru günlük bulmaca; biz buna paylaşım ekliyoruz | Kısmen var (Find The Cat'te paylaşım yok) |
| 4 | **🌐 Önce web, link ile anında oynanır** | Kurulum yok, link paylaşımına ideal; CrazyGames/Poki'de dağıtım | Ducks in Disguise sadece Steam/Switch'te |
| 5 | **🎨 Renklenme ödülü + Ördek Albümü** | Tekrar eden sahne hissini kırar, koleksiyon motivasyonu verir | Kısmen var |

Bonus: **Mini çok oyunculu "Ördek Yarışı"** (v1.2+). Aynı link, aynı sahne; kimin daha hızlı bulduğu asenkron olarak karşılaştırılır. Sunucu gerektirmez.

---

## 3. Oyunun özü

> Sakin ve paylaşılabilir bir arama oyunu. Siyah-beyaz bir sahnede ördekleri bul; her bulduğun ördek sarıya boyanır, hepsini bulunca bütün sahne renklenir. Sonra kendi ördeklerini sakla ve arkadaşına gönder: "Bunu bulamazsın!"

### Temel döngü (Seviye modu)
1. Seviye açılır: siyah-beyaz çizgi sahne ve "0 / N 🦆" sayacı.
2. Oyuncu sahneyi kaydırır ve yakınlaştırır (pinch, tekerlek, çift dokunma).
3. Ördeğe dokununca: ördek sarıya boyanır, "vak!" sesi çalar, küçük kabarcıklar çıkar, sayaç artar.
4. Yanlış dokunuşa ceza yok. Sadece ufak bir dalga efekti gösterilir.
5. Hepsi bulununca sahne renkli versiyona geçer, yıldızlar verilir ve sonraki seviye açılır.

### Yıldızlar
- ⭐ seviyeyi bitirmek
- ⭐⭐ ipucu kullanmadan bitirmek
- ⭐⭐⭐ ipucusuz bitirip **altın ördeği** de bulmak (her seviyede 1 tane, opsiyonel)

### İpucu
- Ördeğin olduğu bölgede 3 saniye boyunca yanıp sönen bir daire gösterilir. Kesin noktayı değil, bölgeyi gösterir.
- Başta 3 ipucu verilir. Her biten seviye +1, her günlük bulmaca +1 ipucu kazandırır.
- Web'de isteğe bağlı ödüllü reklam (+2 ipucu). **Oyunun ortasında asla reklam çıkmaz.**

### Modlar
| Mod | Açıklama | Sürüm |
|---|---|---|
| **Seviyeler** | El yapımı 30 seviye, 5 dünya | v1.0 |
| **Günlük Ördek** | Her gün herkese aynı sahne: 15 ördek, isteğe bağlı süre. Sonuç kartı: `🦆 Vak! #142 · 15/15 · 2:41 · 💡0` | v1.0 |
| **Sakla & Gönder** | Hazır bir sahne seçilir, 5–10 ördek saklanır, link paylaşılır. Arkadaş bulunca süresi karşılaştırılır | v1.0 |
| **Ördek Yarışı** | Aynı link, 2–8 kişi, asenkron skor tablosu | v1.2 |
| **Sezonluk paketler** | Cadılar Bayramı, Yılbaşı, yaz, Bayram | v1.1+ |

---

## 4. Sakla & Gönder (ayrıntılı)

En önemli ayrışma ve büyüme motoru bu mod.

1. Oyuncu açılmış seviyelerden ya da özel "Saklama sahneleri"nden birini seçer.
2. Ördek paletinden poz sürükler (normal, kafası görünen, şapkalı, yavru…), ölçekler ve döndürür.
3. **Adalet kontrolü:** Ördeğin en az %30'u görünür olmalı ve en az 40 px boyutunda olmalı. Değilse "Bu çok zor, kimse bulamaz!" uyarısı çıkar.
4. "Gönder" ile kısa bir link oluşur (`vak.game/h/AB12CD`) ve WhatsApp/Instagram paylaşım menüsü açılır.
5. Arkadaş linki tarayıcıda açar ve **kurulum olmadan** oynar. Bitince ona şu sorulur: "Sen de birine ördek sakla!" → döngü başa döner.
6. Saklayan kişi, kaç kişinin bulduğunu ve ortalama süreyi görür.

**Güvenlik ve moderasyon:** Kullanıcı görsel ya da metin yüklemez. Sadece hazır sahne + hazır ördek pozları + konumlar paylaşılır. Böylece uygunsuz içerik riski sıfıra yakın olur.

**Veri:** Link, `{ sceneId, ducks: [{pose, x, y, scale, rot}] }` biçiminde küçük bir JSON. İlk sürümde URL'nin içine sıkıştırılarak konabilir (sunucu gerekmez). Skor ve istatistik için daha sonra hafif bir backend eklenir (Cloudflare Workers + KV ya da Supabase).

---

## 5. Sanat yönü (BASİT çizimler)

### Stil kuralları
- **Çizgi:** Tek kalınlıkta siyah çizgi (2048 px'lik sahnede 4–6 px), uçlar yuvarlak. Tarama ve gölge yok.
- **Renkli katman:** Düz pastel renkler, sahne başına 6–8 renk. **Ördek sarısı (#FFD23F) sahnenin geri kalanında kullanılmaz**, böylece bulunan ördek hemen göze çarpar.
- **Format:** Önce SVG çizilir, oyun için WebP'ye çevrilir (2048×1536).
- **Araçlar:** Inkscape, Krita veya Procreate. Tek bir fırça preset'i kullanılır.
- **Yapay zeka:** Sadece taslak ve kompozisyon için. Son çizgiler elle temizlenir. Steam'de beyan edilir.

### Ördek karakteri
- Gövde: yumurta şekli. Kafa: daire. Gaga: turuncu yuvarlak üçgen (#FF8C42). Göz: tek siyah nokta. Kuyruk: yukarı kalkık küçük sivri uç.
- Renk: sarı #FFD23F, gölge tonu #F2B705 (sadece renkli katmanda).

### Poz kütüphanesi (12 poz)
| # | Poz | Saklama fikri |
|---|---|---|
| 1 | Yan profil | Raflarda, oyuncakların arasında |
| 2 | Önden | Pencerede, kutuların içinde |
| 3 | Sadece kafa + gaga | Sudan, çantadan, cepten çıkmış |
| 4 | Sadece kuyruk | Yastık ya da çalı arkasında |
| 5 | Ters dönmüş (yüzen) | Havuz, küvet |
| 6 | Süs ördek | Pasta süsü, şapka, avize, anahtarlık |
| 7 | Şapkalı / kostümlü | Kalabalık, festival |
| 8 | Yavru ördek (mini) | Zor seviyelerde |
| 9 | Siluet | Gece, perde arkası |
| 10 | Yansıma | Su birikintisi, ayna |
| 11 | Ördek desenli obje | Halı, perde deseninde gizli (zor) |
| 12 | Altın ördek | Her seviyede 1 tane |

### Saklama kuralları (adil zorluk)
- Ördeğin **en az %30'u** görünür olmalı; gaga veya göz görünmeli.
- %100 zoom'da en küçük ördek 40 px. Mobilde dokunma alanı en az 44 pt.
- Tuzak objeler (limon, muz, sarı top, civciv) kullanılabilir. Ama siyah-beyaz sahnede ördeği her zaman gaga ve kuyruk ele vermeli.
- Sahne 3×3 ızgaraya bölünür; her hücreye en fazla N/4 ördek konur.

---

## 6. Dünyalar ve seviyeler (v1.0: 5 dünya × 6 seviye = 30 seviye)

Zorluk yavaşça artar: ördek sayısı, sahne yoğunluğu ve yeni saklama türü.

| Dünya | Tema | Seviyeler | Ördek sayısı | Yeni saklama türü |
|---|---|---|---|---|
| 1 | 🛁 **Banyo & Ev** (lastik ördeğin evi) | 1–6 | 5 → 12 | Açıkta, raf ve köpük arkası |
| 2 | 🏞️ **Park & Gölet** (gerçek ördeklerin arasında) | 7–12 | 10 → 18 | Gerçek ördek kalabalığında lastik ördek, sadece kafası görünenler |
| 3 | 🏙️ **Şehir** (İstanbul esintili: vapur, simitçi, çarşı) | 13–18 | 15 → 24 | Pencereler, tabelalar, şapkalı ördekler |
| 4 | 🍰 **Pastane & Mutfak** | 19–24 | 18 → 28 | Süs ördekler, limon/muz tuzakları |
| 5 | 🎡 **Lunapark Gecesi** | 25–30 | 22 → 35 | Siluetler, ördek yakalama standı, yansımalar |

Her dünyanın 6. seviyesi büyük ve "boss" seviyesidir: sahne 2 kat genişliğinde olur ve daha çok ördek içerir.

### Seviye 1–6 (ilk prototip içeriği)
| Seviye | Sahne | Ördek | Not |
|---|---|---|---|
| 1 | Küvet, köpük, havlu | 5 | Öğretici: dokunma ve zoom'u gösterir, ördekler açıkta |
| 2 | Lavabo ve dolap | 6 | İlk kısmi saklanma (dolap kapağı arkası) |
| 3 | Çocuk odası, oyuncaklar | 8 | Oyuncakların arasında benzer şekiller |
| 4 | Çamaşır odası | 9 | İlk "sadece kafa" ördekler (sepetten) |
| 5 | Oturma odası | 10 | Süs ördekler (raf, avize) |
| 6 | **Boss:** Bütün ev (kesit görünüm) | 12 | Geniş sahne, altın ördek burada tanıtılır |

Saklama sahneleri (Sakla & Gönder için): v1.0'da 6 sahne (Seviye 1, 7, 13, 19, 25'in boş versiyonları + 1 özel sahne).

---

## 7. Teknik plan

### Teknoloji
- **TypeScript + Vite + PixiJS v8.** Zoom/pan ve maskeli renklendirme için hızlı ve hafif.
- **Web:** Kendi alan adımız + CrazyGames/Poki SDK'sı (reklam ve analitik oradan).
- **Steam:** Electron veya Tauri ile paketleme.
- **Mobil (sonra):** Capacitor.
- **Backend (v1.0 sonrası):** Cloudflare Workers + KV. Kısa linkler, günlük bulmaca skorları ve Sakla & Gönder istatistikleri için.
- **Kayıt:** İlerleme `localStorage` (web) / dosya (Steam).

### Renklendirme
Her seviyede iki görsel olur: `line.webp` (siyah-beyaz) ve `color.webp` (renkli). Bir ördek bulununca, renkli katmandan o ördeğin şekli maske olarak açılır. Seviye bitince bütün renkli katman 1 saniyede görünür hale gelir.

Sakla & Gönder'de ördekler sahneye **ayrı sprite** olarak çizilir (sahneye gömülü değildir). Bu yüzden boş sahne + ördek sprite'ları ile çalışır.

### Seviye veri formatı
Bkz. [`levels/levels.json`](levels/levels.json).
```json
{
  "id": "w1-l01",
  "world": 1,
  "name": "Köpüklü Küvet",
  "size": [2048, 1536],
  "line": "art/world-1/level-01/line.webp",
  "color": "art/world-1/level-01/color.webp",
  "ducks": [ { "id": 1, "x": 512, "y": 780, "r": 48, "pose": "side" } ],
  "golden": { "x": 1800, "y": 300, "r": 30 },
  "hideable": true
}
```

### Seviye editörü = Sakla & Gönder'in temeli
Editörü iki parça olarak yapacağız:
1. **Geliştirici editörü:** Sahneye gömülü ördeklerin konumunu ve yarıçapını işaretler, JSON olarak dışa aktarır.
2. **Oyuncu editörü (Sakla & Gönder):** Aynı kod; poz sürükleme, adalet kontrolleri ve link üretme eklenir.

### Klasör yapısı
```
art/
  characters/         # ördek poz kütüphanesi (SVG)
  world-1/level-01/   # line.svg, color.svg, line.webp, color.webp
levels/levels.json
src/
  scenes/             # Menu, WorldMap, Level, Daily, Hide, Result
  editor/             # geliştirici + oyuncu editörü
  share/              # link kodlama, sonuç kartı
research/
```

---

## 8. Platform ve para kazanma

| Sıra | Platform | Para kazanma | Neden |
|---|---|---|---|
| 1 | **Web** (kendi site + CrazyGames/Poki) | Seviyeler arasında isteğe bağlı ödüllü reklam, platform gelir paylaşımı | Hızlı test, link paylaşımı, viral döngü |
| 2 | **Steam** | Premium **$2.99** (Ducks in Disguise $1.99 ama bizde UGC ve günlük mod var). İleride küçük DLC'ler | Cozy hidden object nişi Steam ortalamasının 2,5 katı başarılı, reklam bütçesi gerekmez |
| 3 | **Mobil** (sadece metrikler iyiyse) | Ücretsiz + **tek seferlik "Reklamsız + 30 ipucu" ($2.99)**, tema paketleri. Zorunlu geçiş reklamı yok | Türün şikayetine dürüst bir cevap |

Mobile geçiş şartları: web'de 1. gün tutundurma > %35, Sakla & Gönder paylaşım oranı > %10, paylaşılan link başına > 1,5 yeni oyuncu.

---

## 9. Yol haritası

| Aşama | Süre | Çıktı |
|---|---|---|
| **M0 – Doğrulama** | 1 hafta | Seviye 1 çizimi; 3 TikTok/Reels "Kaç ördek bulabildin?" videosu; ilgi ölçümü |
| **M1 – Prototip** | 2 hafta | Zoom/pan, dokunarak bulma, sayaç, renklenme; Seviye 1–3 + geliştirici editörü |
| **M2 – Viral çekirdek** | 2 hafta | Sakla & Gönder (URL içinde veri), Günlük Ördek + sonuç kartı; 20 kişiyle test |
| **M3 – Dikey dilim** | 2 hafta | Dünya 1 tamamen bitmiş, ses, ipucu, yıldız, menü; web'de yayın (itch.io + kendi site) |
| **M4 – İçerik** | 4–6 hafta | Dünya 2–5; Steam sayfasını aç (wishlist hedefi 2000+), CrazyGames/Poki başvurusu |
| **M5 – Yayın** | 2 hafta | Steam sürümü (Next Fest demosu ile), backend + skor tabloları |
| **M6 – Mobil** | koşullu | Sadece metrik şartları sağlanırsa |

## 10. Başarı metrikleri
| Metrik | Hedef |
|---|---|
| 1. gün tutundurma (web) | > %35 |
| Seviye 1'i bitirme oranı | > %80 |
| Sakla & Gönder kullanan oyuncu oranı | > %15 |
| Paylaşılan link başına yeni oyuncu | > 1,5 |
| Günlük Ördek sonuç kartı paylaşım oranı | > %10 |
| Steam wishlist (yayından önce) | 2000+ |

## 11. Riskler
| Risk | Önlem |
|---|---|
| Ducks in Disguise ve ördek klonları | UGC, günlük mod, web; daha geniş içerik (30+ seviye) |
| Çizim üretimi yavaş kalabilir | Poz kütüphanesi + tekrar kullanılabilir sahne parçaları; yapay zeka ile taslak |
| UGC'de kötüye kullanım | Sadece hazır sahne ve pozlar; metin ya da görsel yükleme yok |
| Adil olmayan zorluk | Saklama kuralları, editörde otomatik kontroller |
| İsim çakışması | M4'ten önce mağaza ve marka araştırması |

## 12. Hemen sonraki adımlar
1. [ ] Ördek poz kütüphanesini çiz (`art/characters/`, 12 SVG).
2. [ ] Seviye 1 "Köpüklü Küvet" sahnesini çiz (line + color).
3. [ ] Vite + PixiJS projesini kur, zoom/pan + dokunarak bulma prototipini yap.
4. [ ] Geliştirici editörünü yap ve Seviye 1'in ördeklerini yerleştir.
5. [ ] Sakla & Gönder'in URL kodlamasını yap.
