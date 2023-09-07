# Amazon Ürün Fiyatı Takip Uygulaması

Bu uygulama, Amazon'dan bir ürünün fiyatını izlemek ve değişiklikleri takip etmek için kullanılır. Uygulama, Amazon ürün sayfasından veri çekmek için Axios ve Cheerio gibi araçları kullanır ve verileri MongoDB veritabanına kaydeder.

## Başlangıç

Bu adımlar, projeyi yerel makinenizde çalıştırmak için gereken önemli bilgileri içerir.

### Gereksinimler

Bu projeyi çalıştırmak için aşağıdaki yazılım ve paketlere ihtiyacınız vardır:

- Node.js
- MongoDB (yerel veya uzak bir veritabanı sunucusu)
- Amazon ürününün benzersiz kimliği (ASIN veya SKU)

### Kurulum

1. Bu depoyu klonlayın:  git clone https://github.com/enbiyagoral/Web-Scraping.git


2. Proje klasörüne gidin:  cd Web-Scraping


3. Bağımlılıkları yükleyin:  npm install


4. `.env` dosyasını oluşturun ve MongoDB bağlantı dizesini ekleyin:  mongoURI=your_mongodb_connection_string_here


### Kullanım

Projenizi başlatmak için aşağıdaki adımları izleyin:

1. MongoDB veritabanını başlatın veya erişilebilir bir MongoDB sunucusuna bağlanın.

2. `main()` fonksiyonunu kullanarak uygulamayı çalıştırın: node app.js


3. Ürününüzü izlemek için `getProduct()` fonksiyonuna Amazon ürününün ülke kodu ve benzersiz kimliğini (ASIN veya SKU) verin:  await getProduct("tr", "B09SZ6RDKH");


Uygulama, ürünün fiyatındaki değişiklikleri takip edecek ve verileri MongoDB veritabanına kaydedecektir.


## Bilgilendirme

Uygulama tamamen öğrenme ve pratik yapma amacıyla yazılmıştır, hiçbir kar amacı ve verileri işleme amacı bulunmamaktadır. 
