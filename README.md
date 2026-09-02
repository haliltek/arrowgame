# Arrow Challenge - Proje Genel Bakışı

Bu proje, **Arrow Challenge** adlı Android mobil oyun uygulamasının kaynak kodlarını, HTML5/Phaser oyun motoru varlıklarını ve yayınlama dökümantasyonunu içermektedir.

---

## 📁 Proje Dizin Yapısı

```
d:/arrow/
├── arrowupdate/
│   ├── Android Code Source/       # Android Studio ana proje kaynak kodları
│   │   ├── app/
│   │   │   ├── build.gradle       # Gradle bağımlılıkları, SDK (37) ve App ID yapılandırması
│   │   │   └── src/main/
│   │   │       ├── AndroidManifest.xml   # İzinler, AdMob App ID ve aktivite tanımları
│   │   │       ├── java/                 # Native Java kodları (MainActivity.java & WebView bridge)
│   │   │       ├── res/                  # Görsel kaynaklar, renkler, strings.xml, layout (AdMob Banner)
│   │   │       └── assets/               # HTML5 Phaser Oyunu (file.html, game.js, sesler, grafikler, seviyeler)
│   │   ├── build.gradle           # Proje seviyesi Gradle dosyası
│   │   ├── settings.gradle        # Proje ayarları
│   │   └── gradle.properties      # Gradle çalışma özellikleri
│   ├── Demo APK.apk               # Test/demo için hazırlanmış örnek APK dosyası
│   └── Documentation/             # Orijinal HTML formatındaki geliştirici dökümantasyonu (index.html ve görseller)
├── README.md                      # Bu genel bakış rehberi
├── PROJECT_ANALYSIS.md            # Detaylı teknik kod ve mimari incelemesi
└── GOOGLE_PLAY_PREPARATION.md     # Google Play Store yayınına hazırlık adımları ve kontrol listesi
```

---

## 🛠️ Kullanılan Teknolojiler ve Sistem Gereksinimleri

* **Mobil Platform:** Android Native (Java 17)
* **Oyun Motoru:** HTML5 / Phaser JS Framework (`assets/src/game.js`) + `WebView` köprüsü
* **Minimum SDK (`minSdkVersion`):** 26 (Android 8.0)
* **Hedef SDK (`targetSdkVersion`):** 37 (Android 15+)
* **Derleme SDK (`compileSdkVersion`):** 37
* **Reklam Servisleri:** Google Mobile Ads / AdMob SDK (v25.4.0)
  * Banner Reklamları
  * Geçiş (Interstitial) Reklamları
  * Ödüllü (Rewarded) Reklamlar
* **Gerekli Araçlar:**
  * Android Studio Koala (2024.1.1) veya üzeri
  * JDK 17 veya JDK 21
  * Gradle 8.5+

---

## 📄 İlgili Dokümanlar

1. **[PROJECT_ANALYSIS.md](file:///d:/arrow/PROJECT_ANALYSIS.md):** Kod yapısı, Java-Javascript köprüsü, WebView entegrasyonu ve dosya konumlarının detaylı incelemesi.
2. **[GOOGLE_PLAY_PREPARATION.md](file:///d:/arrow/GOOGLE_PLAY_PREPARATION.md):** Metinlerin güncellenmesi, Paket adının değiştirilmesi, AdMob ID'lerinin tanımlanması ve İmzalı AAB (Android App Bundle) oluşturma adımları.
