# Google Play Store Yayın ve Düzenleme Rehberi

Bu doküman, **Arrow Challenge** oyununu kendi markanıza göre özelleştirme (re-skin / metin düzenleme) ve Google Play Store'a yüklemeye hazır hale getirme adımlarını içerir.

---

## 📋 Adım Adım Yapılacak İşlemler Liste Özet

- [ ] **1. Oyun İsminin Değiştirilmesi**
- [ ] **2. Paket Adının (Package Name / Application ID) Değiştirilmesi**
- [ ] **3. Oyun İkonunun Güncellenmesi**
- [ ] **4. Oyun Metinleri, Sesleri ve Görsellerinin Değiştirilmesi**
- [ ] **5. AdMob Reklam Kimliklerinin (Ad Unit IDs) Güncellenmesi**
- [ ] **6. Keystore (İmza Dosyası) Oluşturulması**
- [ ] **7. İmzalı AAB (Android App Bundle) Derlenmesi**

---

## 1. Oyun İsminin Değiştirilmesi

Oyunun Android cihazlarda görünen adını değiştirmek için:

- **Dosya Konumu:** `arrowupdate/Android Code Source/app/src/main/res/values/strings.xml`
- **Mevcut Satır:**
  ```xml
  <string name="app_name">Arrow Challenge</string>
  ```
- **Yapılacak İşlem:** `"Arrow Challenge"` metnini kendi oyun adınızla değiştirin.

---

## 2. Paket Adının (Package Name) Değiştirilmesi

Google Play Store'da her uygulamanın benzersiz bir Paket Adı (Örn: `com.sirketiniz.oyunumuz`) olmalıdır.

### Adım 2.1: Android Studio ile Paket Yapısını Yeniden Adlandırma
1. Android Studio'da sol taraftaki görünümü **Project** moduna alın.
2. `app → src → main → java → com → segadroid → arrowchallenge` dizinine gidin.
3. `segadroid` veya `arrowchallenge` klasörüne sağ tıklayıp **Refactor → Rename** seçeneğini tıklayın.
4. **Rename Package** seçeneğini seçip yeni firma/oyun adınızı girin ve **Refactor** deyin.

### Adım 2.2: `build.gradle` Güncellemesi
- **Dosya Konumu:** `arrowupdate/Android Code Source/app/build.gradle`
- **Değiştirilecek Satırlar:**
  ```groovy
  namespace "com.yeniadiniz.yenioyun"
  defaultConfig {
      applicationId "com.yeniadiniz.yenioyun"
  }
  ```

### Adım 2.3: `AndroidManifest.xml` Güncellemesi
- **Dosya Konumu:** `arrowupdate/Android Code Source/app/src/main/AndroidManifest.xml`
- **Değiştirilecek Satır:**
  ```xml
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.yeniadiniz.yenioyun">
  ```

---

## 3. Oyun İkonunun Değiştirilmesi

- **Dosya Konumu:** `arrowupdate/Android Code Source/app/src/main/res/mipmap-*`
- Replace edilmesi gereken dosyalar:
  - `ic_launcher.png` (Standart Kare/Yuvarlatılmış İkon)
  - `ic_launcher_round.png` (Yuvarlak İkon)
- **İpucu:** Android Studio üzerinde `app` klasörüne sağ tıklayıp **New → Image Asset** diyerek kendi logo PNG dosyanızı kolayca tüm boyutlarda ürettirebilirsiniz.

---

## 4. Oyun Görselleri, Metinleri ve Seslerinin Özelleştirilmesi

Tüm oyun içi medya varlıkları `arrowupdate/Android Code Source/app/src/main/assets/assets/` klasöründedir:

1. **Açılış Logosu (Splash Logo):**
   - Konum: `assets/splash/splashlogo.png`
   - Kendi oyun logonuz ile aynı isimde değiştirin.

2. **Oyun İçi Grafikler & Butonlar:**
   - Konum: `assets/spritesheets/`
   - Butonlar, oklar, zemin ve UI elemanlarını PNG formatını koruyarak düzenleyebilirsiniz.

3. **Müzik ve Ses Efektleri:**
   - Konum: `assets/audio/`
   - OGG/MP3 formatındaki ses dosyalarını aynı isimlerle değiştirebilirsiniz.

4. **Font:**
   - Konum: `assets/gameFont.otf`
   - Kendi Türkçe karakter destekli OTF fontunuzu yükleyebilirsiniz.

---

## 5. AdMob Reklam Kimliklerinin Tanımlanması

Uygulamanızda kendi Google AdMob hesabınızdan gelir elde etmek için reklam kimliklerini değiştirin:

1. **AdMob Application ID:**
   - Dosya: `app/src/main/AndroidManifest.xml`
   - Satır 28: `android:value="ca-app-pub-3940256099942544~3347511713"`
   - Kendi AdMob Uygulama Kimliğiniz (`ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX`) ile değiştirin.

2. **Banner Reklam Unit ID:**
   - Dosya: `app/src/main/res/layout/activity_main.xml`
   - Satır 26: `app:adUnitId="ca-app-pub-3940256099942544/6300978111"`
   - Kendi Banner Ad Unit ID'niz ile değiştirin.

3. **Interstitial (Geçiş) Reklam Unit ID:**
   - Dosya: `app/src/main/java/com/segadroid/arrowchallenge/MainActivity.java`
   - Satır 129: `"ca-app-pub-3940256099942544/1033173712"`
   - Kendi Interstitial Ad Unit ID'niz ile değiştirin.

4. **Rewarded (Ödüllü) Reklam Unit ID:**
   - Dosya: `app/src/main/java/com/segadroid/arrowchallenge/MainActivity.java`
   - Satır 224: `"ca-app-pub-3940256099942544/5224354917"`
   - Kendi Rewarded Ad Unit ID'niz ile değiştirin.

---

## 6. Google Play İçin İmzalı AAB (Android App Bundle) Derleme

Google Play Store artık düz APK kabul etmemekte, `.aab` formatı istemektedir:

1. Android Studio'da menüden **Build → Generate Signed Bundle / APK** seçin.
2. **Android App Bundle** işaretleyip **Next** deyin.
3. **Create new...** butonuna basarak yeni bir **Keystore (.jks)** anahtar dosyası ve şifre oluşturun *(Bu dosyayı ve şifreyi asla kaybetmeyin, kaybolursa güncelleme atamazsınız!)*.
4. Build Variant olarak **release** seçeneğini seçin.
5. **Finish** butonuna basarak derlemeyi tamamlayın.
6. Çıktı dosyası `app/release/app-release.aab` konumunda oluşacaktır.

---

## 7. Google Play Console Yükleme İpuçları

- **Hedef SDK Uyumsuzluğu Yok:** `build.gradle` dosyasında `targetSdkVersion 37` tanımlıdır, bu nedenle güncel Google Play politikaları ile %100 uyumludur.
- **Gizlilik Politikası (Privacy Policy):** AdMob kullandığınız için bir Gizlilik Politikası URL'si hazırlamanız gereklidir.
- **Data Safety (Veri Güvenliği):** Google Play Console'da "Ad ID / Reklam Kimliği" toplandığını ve reklam/analiz amacıyla kullanıldığını bildirmelisiniz.
