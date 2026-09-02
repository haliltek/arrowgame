# Arrow Challenge - Detaylı Kod ve Mimari İncelemesi

Bu doküman, projenin mimari yapısını, kullanılan teknolojileri ve bileşenler arası etkileşimi detaylandırmaktadır.

---

## 1. Mimari Mimarisi (Hybrid Architecture)

Proje **Hybrid Web-Native** yaklaşımıyla inşa edilmiştir:
- **Native Android Katmanı (Java):** Uygulamanın tam ekran `WebView` konteynerini yönetir, reklamları (AdMob Banner, Interstitial, Rewarded) yükler ve yerel Android işlevlerini (Paylaşım, Derecelendirme, Ekran Yönü) tetikler.
- **HTML5 Game Engine Katmanı (JS / Phaser):** Uygulamanın tüm görsel oyun mantığı, seviyeler, animasyonlar ve ses efektleri `app/src/main/assets` klasöründe barındırılan web teknolojileriyle çalışır.

```
+-----------------------------------------------------------------------+
|                         Android Native (Java)                         |
|  [MainActivity.java]  <--->  [WebAppInterface Bridge]  <---> [AdMob]  |
+-----------------------------------------------------------------------+
                                   |
                     JavascriptInterface ("Android")
                                   v
+-----------------------------------------------------------------------+
|                         WebView (Assets HTML5)                        |
|  [info/file.html] -> [src/ads.js] -> [src/game.js (Phaser Engine)]   |
+-----------------------------------------------------------------------+
```

---

## 2. Kritik Dosyalar ve Sorumlulukları

### A. Native Android Dosyaları

1. **[MainActivity.java](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/java/com/segadroid/arrowchallenge/MainActivity.java):**
   - **WebView Kurulumu:** `browser.loadUrl("file:///android_asset/info/file.html");` ile oyunu başlatır.
   - **AdMob Entegrasyonu:**
     - Interstitial: `loadAd()` ve `showInterstitial()`
     - Rewarded: `loadRewardedAd()` ve `showRewardedAd()`
     - Banner: `showBanner()` ve `hideBanner()`
   - **WebAppInterface (@JavascriptInterface):** JS tarafından çağrılabilen metodlar (`showAd`, `showRewardedAd`, `showAndroidBanner`, `hideAndroidBanner`, `portrait`, `landscape`, `shareThisApp`, `rateThisApp`).

2. **[AndroidManifest.xml](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/AndroidManifest.xml):**
   - İzinler: `INTERNET`, `ACCESS_NETWORK_STATE`, `AD_ID`.
   - Paket Adı: `com.segadroid.arrowchallenge`.
   - AdMob App ID Tanımı (`com.google.android.gms.ads.APPLICATION_ID`).

3. **[build.gradle (app)](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/build.gradle):**
   - `namespace` & `applicationId`: `"com.segadroid.arrowchallenge"`
   - SDK Seviyeleri: `compileSdkVersion 37`, `minSdkVersion 26`, `targetSdkVersion 37`.
   - Reklam Bağımlılığı: `com.google.android.gms:play-services-ads:25.4.0`.

4. **[activity_main.xml](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/res/layout/activity_main.xml):**
   - Ekranı kaplayan `WebView` (`@+id/webView`).
   - Ekranın alt kısmına yerleştirilmiş `AdView` (`@+id/adView`) (Banner Reklam).

---

### B. Assets & Web Oyun Dosyaları

Tüm oyun assets dosyaları `app/src/main/assets/` altında bulunur:

1. **[info/file.html](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/assets/info/file.html):**
   - Oyunu başlatan ana HTML şablonu.
   - Özel font yüklemesi (`assets/gameFont.otf`).
   - `src/ads.js` ve `src/game.js` dosyalarını yükler.

2. **[src/ads.js](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/assets/src/ads.js):**
   - Javascript tarafındaki reklam ve yönlendirme mantığı.
   - Android köprüsüne (`window.Android`) erişerek reklamları tetikler.
   - Ödüllü reklam tamamlandığında `integration.rewarded()` fonksiyonu çalışır.

3. **[src/game.js](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/assets/src/game.js):**
   - Phaser JS ile paketlenmiş ana oyun döngüsü ve mekanikleri.

4. **[assets/audio/](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/assets/assets/audio):**
   - Arka plan müzikleri ve ses efektleri (OGG / MP3).

5. **[assets/spritesheets/](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/assets/assets/spritesheets):**
   - Oyunda kullanılan butonlar, oklar, nesneler ve UI grafikleri.

6. **[assets/levels/](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/assets/assets/levels):**
   - Seviye verileri ve harita konfigürasyonları (`levels_0.json` - `levels_7.json`).

7. **[assets/splash/splashlogo.png](file:///d:/arrow/arrowupdate/Android%20Code%20Source/app/src/main/assets/assets/splash):**
   - Oyun açılışındaki logo resmi.

---

## 3. Veri Akışı ve Köprü Mantığı (Bridge Flow)

```
[Oyuncu Butona Basar veya Bölüm Biter]
               │
               ▼
   JavaScript (src/ads.js) ─────► Android.showAd()
                                       │
                                       ▼
                            Java (MainActivity.java)
                                       │
                                       ▼
                          Google AdMob SDK (Interstitial)
                                       │
                                       ▼
                       [Reklam Kapatıldığında JS Tetikleme]
    browser.evaluateJavascript("integration.adClosed(); resumeMusic();")
```
