const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config()

const mongoose = require('mongoose');
const Product = require('./db')



async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log('MongoDB bağlantısı kuruldu.');
  } catch (err) {
    console.error('MongoDB bağlantısı sırasında hata oluştu:', err);
  }
}

async function getProduct(countryCode,id) {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB bağlantısı kurulmadı.');
      return;
    }

    const productID = id;
    const productUrl = `https://www.amazon.com.${countryCode}/dp/${productID}`;
    const response = await axios.get(productUrl,
                    {
                      headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
                      }
                    });
                    
    const $ = cheerio.load(response.data);

    const title = $("#productTitle").text().trim();
    const price = parseFloat($("#apex_desktop_newAccordionRow").find($(".a-offscreen")).text().trim().replace('TL','').replace(',', '.'));

    const tecnicTable = $("#productDetails_techSpec_section_1 tr");

    const productObject = new Product({
      title,
      price,
      productUrl,
      tecnicDetails: [],
    });

    for (const row of tecnicTable) {
      const rowTh = $(row).find("th").text().trim();
      const rowTd = $(row).find("td").text().trim();
      productObject.tecnicDetails.push({ key: rowTh, value: rowTd });
    }

    const existingProduct = await Product.findOne({productUrl});
    if(!existingProduct){ 
      await productObject.save();
    }else{ 
      if(existingProduct.price!==price){
        existingProduct.price = price;
        console.log(`
        Ürünün fiyatı güncellendi!
        
        Eski fiyat: ${existingProduct.price},
        Yeni fiyat: ${price}
        `);
        await productObject.save(); 
      }
    };

    console.log(productObject);
  } catch (error) {
    console.error('Hata oluştu:', error);
  }
}


async function main() {
  try {
      await connectToDatabase();
      await getProduct("tr", "B09SZ6RDKH");
  } catch (error) {
    console.error('Hata oluştu:', error);
  } finally {
    mongoose.connection.close();
  }
}

main();
