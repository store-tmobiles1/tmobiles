import React, { useState, useEffect } from 'react';
import { ShoppingCart, Home, Store, CreditCard, CheckCircle, Smartphone, Headphones, BatteryCharging, Box, Usb, Car, Phone } from 'lucide-react';

// Mock Product Data
// Expanded to include products from the provided Google Sheet
const productsData = [
  // Existing initial products (retained some for variety, updated IDs)
  {
    id: 'p1',
    name: 'iPhone 15 Pro Max Clear Case',
    category: 'Screen Guards & Back Covers',
    type: 'Clear Cases', // More specific type
    brand: 'Generic',
    compatibility: 'iPhone 15 Pro Max',
    price: 999,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=iPhone+15+Clear+Case',
    description: 'Ultra-slim transparent case with shock-absorbent corners, perfect fit for iPhone 15 Pro Max. Protects against scratches and drops.',
  },
  {
    id: 'p2',
    name: 'Samsung Galaxy S24 Ultra Tempered Glass',
    category: 'Screen Guards & Back Covers',
    type: 'Tempered Glass', // More specific type
    brand: 'Generic',
    compatibility: 'Samsung Galaxy S24 Ultra',
    price: 649,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=S24+Glass',
    description: '9H hardness tempered glass for Samsung Galaxy S24 Ultra, anti-fingerprint coating, and bubble-free installation.',
  },
  {
    id: 'p3',
    name: 'boAt Rockerz 255 Pro+ Neckband',
    category: 'Audio Devices',
    type: 'Neckbands',
    brand: 'boAt',
    price: 1399,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=boAt+Neckband',
    description: 'Premium wireless neckband with ASAP Charge technology, IPX7 water resistance, and crystal-clear audio. Ideal for workouts and daily use.',
  },
  {
    id: 'p4',
    name: 'JBL Flip 6 Portable Bluetooth Speaker',
    category: 'Audio Devices',
    type: 'Bluetooth Speakers', // Renamed from Smart Speakers
    brand: 'JBL',
    price: 7499,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=JBL+Speaker',
    description: 'Powerful portable speaker with rich audio, deep bass, and 12 hours of playtime. Waterproof and dustproof design, perfect for outdoor adventures.',
  },
  {
    id: 'p5',
    name: 'Anker PowerPort III 20W USB-C Charger',
    category: 'Chargers',
    type: 'Other Brands',
    brand: 'Anker',
    price: 1199,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=Anker+Charger',
    description: 'Compact 20W USB-C charger with PowerIQ 3.0, optimized for fast charging iPhones and other compatible devices. Universal compatibility.',
  },
  {
    id: 'p6',
    name: 'Apple 20W USB-C Power Adapter',
    category: 'Chargers',
    type: 'Apple',
    brand: 'Apple',
    price: 1899,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=Apple+Charger',
    description: 'Official Apple 20W USB-C Power Adapter for fast and efficient charging at home, in the office, or on the go. Compatible with all USB-C devices.',
  },
  {
    id: 'p7',
    name: 'OnePlus Nord Buds 2r Earbuds',
    category: 'Audio Devices',
    type: 'Earbuds',
    brand: 'OnePlus',
    price: 2299,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=OnePlus+Buds',
    description: 'Immersive audio experience with deep bass, long-lasting battery, and comfortable fit. Designed for seamless connectivity and calls.',
  },
  {
    id: 'p8',
    name: 'Ambrane Portable Power Bank 10000mAh',
    category: 'Other Mobile Accessories',
    type: 'Power Banks',
    brand: 'Ambrane',
    price: 899,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=Power+Bank',
    description: 'High-capacity 10000mAh power bank with dual USB output, fast charging, and compact design. Keep your devices charged on the go.',
  },
  {
    id: 'p9',
    name: 'Portronics Universal Car Phone Mount',
    category: 'Other Mobile Accessories',
    type: 'Car Accessories', // Broader type
    brand: 'Portronics',
    price: 549,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=Car+Mount',
    description: 'Adjustable car phone mount with strong suction cup, 360-degree rotation, and universal compatibility. Securely holds your phone while driving.',
  },
  {
    id: 'p10',
    name: 'Google Pixel Buds Pro',
    category: 'Audio Devices',
    type: 'Earbuds',
    brand: 'Google',
    price: 18999,
    image: 'https://placehold.co/400x400/1e40af/ffffff?text=Pixel+Buds',
    description: 'Premium earbuds with active noise cancellation, custom-designed speakers, and up to 11 hours of listening time. Immersive sound for all-day wear.',
  },
  {
    id: 'p11',
    name: 'Spigen Rugged Armor Back Cover for iPhone 14',
    category: 'Screen Guards & Back Covers',
    type: 'Hard Cases', // More specific type
    brand: 'Spigen',
    compatibility: 'iPhone 14',
    price: 1299,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Spigen+iPhone14+Case',
    description: 'Military-grade drop protection with a sleek, carbon fiber design. Perfect for everyday use and extreme protection.',
  },
  {
    id: 'p12',
    name: 'Redmi 10 Power Screen Protector',
    category: 'Screen Guards & Back Covers',
    type: 'Screen Guards',
    brand: 'Generic',
    compatibility: 'Redmi 10 Power',
    price: 349,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Redmi10+Screen',
    description: 'Scratch-resistant tempered glass for Redmi 10 Power, with oleophobic coating for anti-fingerprint properties.',
  },
  {
    id: 'p13',
    name: 'Sony WH-CH520 Wireless Headphones',
    category: 'Audio Devices',
    type: 'Headphones',
    brand: 'Sony',
    price: 4990,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Sony+Headphones',
    description: 'Lightweight on-ear headphones with up to 50 hours of battery life, DSEE upscaling, and multi-point connection for versatile listening.',
  },
  {
    id: 'p14',
    name: 'Bose SoundLink Flex Portable Bluetooth Speaker',
    category: 'Audio Devices',
    type: 'Bluetooth Speakers',
    brand: 'Bose',
    price: 13900,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Bose+Speaker',
    description: 'High-quality portable Bluetooth speaker with amazing sound, rugged design, and IP67 waterproof rating. Built for adventure.',
  },
  {
    id: 'p15',
    name: 'Samsung 25W Type-C Fast Charger',
    category: 'Chargers',
    type: 'Samsung',
    brand: 'Samsung',
    price: 1299,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Samsung+Charger',
    description: 'Super fast charging for Samsung Galaxy devices, providing up to 25W of power. Compatible with USB-PD 3.0 enabled phones.',
  },
  {
    id: 'p16',
    name: 'Vivo FlashCharge 44W Adapter',
    category: 'Chargers',
    type: 'Vivo',
    brand: 'Vivo',
    price: 1599,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Vivo+Charger',
    description: 'Original Vivo FlashCharge 44W adapter for rapid charging of compatible Vivo smartphones. Ensure your device supports 44W charging.',
  },
  {
    id: 'p17',
    name: 'Ambrane Powerlit Pro 20000mAh Power Bank',
    category: 'Other Mobile Accessories',
    type: 'Power Banks',
    brand: 'Ambrane',
    price: 1699,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Ambrane+PowerBank',
    description: 'High-capacity 20000mAh power bank with 20W fast charging, dual inputs (Type-C & Micro USB), and triple output ports. Charge multiple devices simultaneously.',
  },
  {
    id: 'p18',
    name: 'Braided USB-C to Lightning Cable 1 Meter',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'Generic',
    price: 799,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=USBC+Lightning',
    description: 'Durable USB-C to Lightning cable for fast charging and data sync for Apple devices. MFi certified for safe and reliable performance.',
  },
  {
    id: 'p19',
    name: 'Magnetic Car Dashboard Phone Holder',
    category: 'Other Mobile Accessories',
    type: 'Car Accessories',
    brand: 'Generic',
    price: 449,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Magnetic+Holder',
    description: 'Strong magnetic phone holder for dashboard, ensures your phone stays secure on bumpy roads. Easy to install and remove.',
  },
  {
    id: 'p20',
    name: 'AirPods Pro 2nd Gen Silicone Case',
    category: 'Screen Guards & Back Covers',
    type: 'Silicone Cases',
    brand: 'Generic',
    compatibility: 'AirPods Pro 2nd Gen',
    price: 599,
    image: 'https://placehold.co/400x400/3b82f6/ffffff?text=AirPods+Case',
    description: 'Protective silicone case for AirPods Pro 2nd Generation, soft touch and shock-absorbent. Keeps your case scratch-free.',
  },
  {
    id: 'p21',
    name: 'OPPO SuperVOOC 65W Charger',
    category: 'Chargers',
    type: 'Other Brands', // Assuming OPPO not a primary type
    brand: 'OPPO',
    price: 1999,
    image: 'https://placehold.co/400x400/60a5fa/ffffff?text=OPPO+Charger',
    description: 'Original OPPO SuperVOOC 65W charger for ultra-fast charging compatible OPPO and Realme devices. Comes with Type-C cable.',
  },
  {
    id: 'p22',
    name: 'Realme 30W Dart Charger',
    category: 'Chargers',
    type: 'Realme',
    brand: 'Realme',
    price: 1349,
    image: 'https://placehold.co/400x400/60a5fa/ffffff?text=Realme+Charger',
    description: 'Genuine Realme 30W Dart Charge adapter, compatible with all Dart Charge enabled Realme smartphones. Rapidly charges your device.',
  },
  {
    id: 'p23',
    name: 'Xiaomi 33W Fast Charger',
    category: 'Chargers',
    type: 'Redmi', // Xiaomi/Redmi often grouped
    brand: 'Xiaomi',
    price: 999,
    image: 'https://placehold.co/400x400/60a5fa/ffffff?text=Xiaomi+Charger',
    description: 'Fast charging 33W adapter for Xiaomi and Redmi phones. Offers quick power delivery for a seamless experience.',
  },
  {
    id: 'p24',
    name: 'Type C to 3.5mm Jack Audio Connector',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'Generic',
    price: 249,
    image: 'https://placehold.co/400x400/60a5fa/ffffff?text=TypeC+to+Audio',
    description: 'Convert your USB Type-C port to a 3.5mm audio jack. High-quality sound output for devices without a dedicated headphone jack.',
  },
  {
    id: 'p25',
    name: 'Foldable Desktop Phone Stand',
    category: 'Other Mobile Accessories',
    type: 'Phone Stands',
    brand: 'Generic',
    price: 399,
    image: 'https://placehold.co/400x400/60a5fa/ffffff?text=Phone+Stand',
    description: 'Portable and adjustable desktop phone stand. Perfect for hands-free video calls, watching movies, and browsing. Universal compatibility.',
  },
  {
    id: 'p26',
    name: 'Mobile Phone Cleaning Kit',
    category: 'Other Mobile Accessories',
    type: 'Cleaning & Maintenance',
    brand: 'Generic',
    price: 199,
    image: 'https://placehold.co/400x400/60a5fa/ffffff?text=Cleaning+Kit',
    description: 'All-in-one cleaning kit for smartphones. Includes microfiber cloth, cleaning spray, and dust blower for thorough device maintenance.',
  },
  {
    id: 'p27',
    name: 'Noise ColorFit Pro 4 Alpha Smartwatch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Noise',
    price: 3499,
    image: 'https://placehold.co/400x400/60a5fa/ffffff?text=Noise+Smartwatch',
    description: 'Advanced smartwatch with 1.78" AMOLED display, Bluetooth calling, and comprehensive health tracking. Perfect companion for your smartphone.',
  },

  // Products from Google Sheet
  {
    id: 'gs_p1',
    name: 'OPPO USB-A to Type-C Cable',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'OPPO',
    compatibility: '',
    price: 499,
    image: 'https://placehold.co/400x400/4CAF50/ffffff?text=OPPO+Cable',
    description: 'Original OPPO USB-A to Type-C cable for charging and data transfer.',
  },
  {
    id: 'gs_p2',
    name: 'OnePlus USB-A to Type-C Cable 10A 1.5M',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'OnePlus',
    compatibility: '',
    price: 949,
    image: 'https://placehold.co/400x400/4CAF50/ffffff?text=OnePlus+Cable',
    description: 'High-speed OnePlus USB-A to Type-C cable, 1.5 meters long with 10A support.',
  },
  {
    id: 'gs_p3',
    name: 'Realme SuperVOOC USB-A to Type-C Cable 1M',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'Realme',
    compatibility: '',
    price: 499,
    image: 'https://placehold.co/400x400/4CAF50/ffffff?text=Realme+Cable',
    description: 'Realme SuperVOOC compatible USB-A to Type-C cable, 1 meter for fast charging.',
  },
  {
    id: 'gs_p4',
    name: 'Google USB-C to USB-C Cable',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'Google',
    compatibility: '',
    price: 499,
    image: 'https://placehold.co/400x400/4CAF50/ffffff?text=Google+C+to+C',
    description: 'Original Google USB-C to USB-C cable for efficient charging and data sync.',
  },
  {
    id: 'gs_p5',
    name: 'Apple 60W USB-C Charge Cable (1m)',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'Apple',
    compatibility: '',
    price: 1900,
    image: 'https://placehold.co/400x400/4CAF50/ffffff?text=Apple+60W+Cable',
    description: 'Apple original 60W USB-C charging cable, 1 meter long for fast and safe charging.',
  },
  {
    id: 'gs_p6',
    name: 'Samsung USB-C to Type-C Cable',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'Samsung',
    compatibility: '',
    price: 599,
    image: 'https://placehold.co/400x400/4CAF50/ffffff?text=Samsung+C+to+C',
    description: 'Genuine Samsung Type-C to Type-C cable for high-speed charging and data transfer.',
  },
  {
    id: 'gs_p7',
    name: 'Samsung Original Type-C Earphone',
    category: 'Audio Devices',
    type: 'Wired Earphones',
    brand: 'Samsung',
    price: 999,
    image: 'https://placehold.co/400x400/FFC107/333333?text=Samsung+TypeC+Earphone',
    description: 'Original Samsung wired earphones with Type-C connector for clear audio.',
  },
  {
    id: 'gs_p8',
    name: 'Apple EarPods (USB-C)',
    category: 'Audio Devices',
    type: 'Wired Earphones',
    brand: 'Apple',
    price: 1999,
    image: 'https://placehold.co/400x400/FFC107/333333?text=Apple+USB-C+EarPods',
    description: 'Authentic Apple EarPods with USB-C connector, designed for comfortable fit and quality sound.',
  },
  {
    id: 'gs_p9',
    name: 'JBL Tune 310C Wired in-Ear Type C Headphones',
    category: 'Audio Devices',
    type: 'Wired Earphones',
    brand: 'JBL',
    price: 1499,
    image: 'https://placehold.co/400x400/FFC107/333333?text=JBL+TypeC+Headphones',
    description: 'JBL Tune 310C in-ear wired headphones with Type-C connector, delivering powerful bass.',
  },
  {
    id: 'gs_p10',
    name: 'Realme Buds Classic Type-C',
    category: 'Audio Devices',
    type: 'Wired Earphones',
    brand: 'Realme',
    price: 499,
    image: 'https://placehold.co/400x400/FFC107/333333?text=Realme+Buds+Classic',
    description: 'Realme Buds Classic wired earphones with Type-C connector, comfortable and clear sound.',
  },
  {
    id: 'gs_p11',
    name: 'HAMMER BASH Wireless BT Headphones',
    category: 'Audio Devices',
    type: 'Headphones',
    brand: 'HAMMER',
    price: 2499,
    image: 'https://placehold.co/400x400/FFC107/333333?text=HAMMER+Headphones',
    description: 'Over-ear wireless Bluetooth headphones with deep bass and comfortable earcups.',
  },
  {
    id: 'gs_p12',
    name: 'Redmi Buds 5C',
    category: 'Audio Devices',
    type: 'Earbuds',
    brand: 'Redmi',
    price: 1799,
    image: 'https://placehold.co/400x400/FFC107/333333?text=Redmi+Buds+5C',
    description: 'Redmi Buds 5C true wireless earbuds with immersive audio and long battery life.',
  },
  {
    id: 'gs_p13',
    name: 'SHKOD AirLits Max Wireless On-Ear Headphones',
    category: 'Audio Devices',
    type: 'Headphones',
    brand: 'SHKOD',
    price: 2499,
    image: 'https://placehold.co/400x400/FFC107/333333?text=SHKOD+AirLits+Max',
    description: 'SHKOD AirLits Max wireless on-ear headphones with Bluetooth 5.3 for superior sound.',
  },
  {
    id: 'gs_p14',
    name: 'Skullcandy Jib In-Ear Wired Earbuds',
    category: 'Audio Devices',
    type: 'Wired Earphones',
    brand: 'Skullcandy',
    price: 899,
    image: 'https://placehold.co/400x400/FFC107/333333?text=Skullcandy+Jib',
    description: 'Skullcandy Jib wired in-ear earbuds for crisp audio and comfortable fit.',
  },
  {
    id: 'gs_p15',
    name: 'boAt Rockerz 295v2 Wireless Neckband',
    category: 'Audio Devices',
    type: 'Neckbands',
    brand: 'boAt',
    price: 1999,
    image: 'https://placehold.co/400x400/FFC107/333333?text=boAt+Rockerz+295v2',
    description: 'boAt Rockerz 295v2 wireless neckband with Bluetooth v5.0 for seamless connectivity.',
  },
  {
    id: 'gs_p16',
    name: 'boAt Rockerz 235v2 Wireless Neckband',
    category: 'Audio Devices',
    type: 'Neckbands',
    brand: 'boAt',
    price: 999,
    image: 'https://placehold.co/400x400/FFC107/333333?text=boAt+Rockerz+235v2',
    description: 'boAt Rockerz 235v2 wireless neckband, lightweight and ergonomic design.',
  },
  {
    id: 'gs_p17',
    name: 'boAt Rockerz 255R Wireless Bluetooth Headset',
    category: 'Audio Devices',
    type: 'Neckbands',
    brand: 'boAt',
    price: 999,
    image: 'https://placehold.co/400x400/FFC107/333333?text=boAt+Rockerz+255R',
    description: 'boAt Rockerz 255R wireless Bluetooth headset, perfect for on-the-go music and calls.',
  },
  {
    id: 'gs_p18',
    name: 'Vivo Flash Charge 90W Adapter with Cable',
    category: 'Chargers',
    type: 'Vivo',
    brand: 'Vivo',
    price: 3499,
    image: 'https://placehold.co/400x400/2196F3/ffffff?text=Vivo+90W+Charger',
    description: 'Vivo original 90W Flash Charge adapter with USB to Type-C cable for super-fast charging.',
  },
  {
    id: 'gs_p19',
    name: 'Apple 20W USB-C Power Adapter',
    category: 'Chargers',
    type: 'Apple',
    brand: 'Apple',
    price: 1900,
    image: 'https://placehold.co/400x400/2196F3/ffffff?text=Apple+20W+Adapter',
    description: 'Official Apple 20W USB-C Power Adapter for efficient and quick charging of Apple devices.',
  },
  {
    id: 'gs_p20',
    name: 'Samsung 25W PD Adapter USB-C',
    category: 'Chargers',
    type: 'Samsung',
    brand: 'Samsung',
    price: 1299,
    image: 'https://placehold.co/400x400/2196F3/ffffff?text=Samsung+25W+PD',
    description: 'Samsung 25W Power Delivery USB-C adapter for fast and universal charging.',
  },
  {
    id: 'gs_p21',
    name: 'Samsung 45W Type-C Travel Adaptor with Cable',
    category: 'Chargers',
    type: 'Samsung',
    brand: 'Samsung',
    price: 3499,
    image: 'https://placehold.co/400x400/2196F3/ffffff?text=Samsung+45W+Travel',
    description: 'Samsung 45W Type-C travel adapter with included cable for super fast charging on the go.',
  },
  {
    id: 'gs_p22',
    name: 'Samsung 45W Power Adapter',
    category: 'Chargers',
    type: 'Samsung',
    brand: 'Samsung',
    price: 2999,
    image: 'https://placehold.co/400x400/2196F3/ffffff?text=Samsung+45W+Power',
    description: 'High-power Samsung 45W adapter for rapid charging of compatible devices.',
  },
  {
    id: 'gs_p23',
    name: 'SHKOD 25W USB-C Fast Charging Adapter',
    category: 'Chargers',
    type: 'Other Brands',
    brand: 'SHKOD',
    price: 999,
    image: 'https://placehold.co/400x400/2196F3/ffffff?text=SHKOD+25W+Charger',
    description: 'SHKOD 25W USB-C fast charging adapter, compact and efficient for daily use.',
  },
  {
    id: 'gs_p24',
    name: 'Philips Beard Trimmer Series 3000',
    category: 'Other Mobile Accessories',
    type: 'Grooming Devices',
    brand: 'Philips',
    price: 1299,
    image: 'https://placehold.co/400x400/795548/ffffff?text=Philips+Trimmer',
    description: 'Philips Beard Trimmer Series 3000 for precise and easy beard trimming.',
  },
  {
    id: 'gs_p25',
    name: 'Xiaomi Beard Trimmer 2C',
    category: 'Other Mobile Accessories',
    type: 'Grooming Devices',
    brand: 'Xiaomi',
    price: 1299,
    image: 'https://placehold.co/400x400/795548/ffffff?text=Xiaomi+Trimmer',
    description: 'Xiaomi Beard Trimmer 2C with self-sharpening blades for a smooth and quick trim.',
  },
  {
    id: 'gs_p26',
    name: 'boAt Airdopes 190 Wireless Earphones',
    category: 'Audio Devices',
    type: 'Earbuds',
    brand: 'boAt',
    price: 1299,
    image: 'https://placehold.co/400x400/FFC107/333333?text=boAt+Airdopes+190',
    description: 'boAt Airdopes 190 wireless earphones, truly wireless experience with powerful sound.',
  },
  {
    id: 'gs_p27',
    name: 'boAt Airdopes 441 True Wireless Earbuds',
    category: 'Audio Devices',
    type: 'Earbuds',
    brand: 'boAt',
    price: 2499,
    image: 'https://placehold.co/400x400/FFC107/333333?text=boAt+Airdopes+441',
    description: 'boAt Airdopes 441 TWS earbuds with immersive audio and secure fit.',
  },
  {
    id: 'gs_p28',
    name: 'boAt Airdopes 71 Wireless Earphone',
    category: 'Audio Devices',
    type: 'Earbuds',
    brand: 'boAt',
    price: 999,
    image: 'https://placehold.co/400x400/FFC107/333333?text=boAt+Airdopes+71',
    description: 'Compact boAt Airdopes 71 wireless earphone for daily listening.',
  },
  {
    id: 'gs_p29',
    name: 'boAt Rapid Car Charger',
    category: 'Chargers',
    type: 'Car Chargers',
    brand: 'boAt',
    price: 500,
    image: 'https://placehold.co/400x400/2196F3/ffffff?text=boAt+Car+Charger',
    description: 'boAt rapid car charger for quick charging your devices on the go.',
  },
  {
    id: 'gs_p30',
    name: 'Ultra 2 15+1 Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Generic',
    price: 1499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Ultra+2+Smartwatch',
    description: 'Feature-rich smart watch with a large display and various tracking functions.',
  },
  {
    id: 'gs_p31',
    name: 'HK15 Pro Max Ultra 2 Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Generic',
    price: 1499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=HK15+Pro+Max',
    description: 'Advanced smart watch with a premium design and comprehensive health features.',
  },
  {
    id: 'gs_p32',
    name: 'NOVO Hair Dryer',
    category: 'Other Mobile Accessories',
    type: 'Grooming Devices',
    brand: 'NOVO',
    price: 600,
    image: 'https://placehold.co/400x400/795548/ffffff?text=NOVO+Hair+Dryer',
    description: 'Compact and efficient hair dryer for quick styling.',
  },
  {
    id: 'gs_p33',
    name: 'Google Speaker and Wireless Charger',
    category: 'Audio Devices',
    type: 'Smart Speakers',
    brand: 'Google',
    price: 800,
    image: 'https://placehold.co/400x400/FFC107/333333?text=Google+Speaker',
    description: 'Google smart speaker with integrated wireless charging for convenience.',
  },
  {
    id: 'gs_p34',
    name: 'R1S Selfie Stick',
    category: 'Other Mobile Accessories',
    type: 'Photography Accessories',
    brand: 'Generic',
    price: 300,
    image: 'https://placehold.co/400x400/607D8B/ffffff?text=Selfie+Stick',
    description: 'Extendable selfie stick for perfect group photos and vlogging.',
  },
  {
    id: 'gs_p35',
    name: 'Mini Cooling Fan',
    category: 'Other Mobile Accessories',
    type: 'Portable Fans',
    brand: 'Generic',
    price: 800,
    image: 'https://placehold.co/400x400/607D8B/ffffff?text=Mini+Fan',
    description: 'Compact mini cooling fan, ideal for personal use during hot weather.',
  },
  {
    id: 'gs_p36',
    name: 'Camera Lens Rings (Set)',
    category: 'Other Mobile Accessories',
    type: 'Photography Accessories',
    brand: 'Generic',
    price: 200,
    image: 'https://placehold.co/400x400/607D8B/ffffff?text=Lens+Rings',
    description: 'Decorative and protective camera lens rings for smartphones.',
  },
  {
    id: 'gs_p37',
    name: 'Samsung Original OTG Type-C to USB Adapter',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'Samsung',
    price: 200,
    image: 'https://placehold.co/400x400/4CAF50/ffffff?text=Samsung+OTG',
    description: 'Samsung original OTG adapter for connecting USB devices to Type-C phones.',
  },
  {
    id: 'gs_p38',
    name: 'OnePlus Original AUX to Type-C Adapter',
    category: 'Other Mobile Accessories',
    type: 'Cables & Adapters',
    brand: 'OnePlus',
    price: 150,
    image: 'https://placehold.co/400x400/4CAF50/ffffff?text=OnePlus+AUX',
    description: 'OnePlus original AUX to Type-C adapter for connecting 3.5mm audio devices.',
  },
  {
    id: 'gs_p39',
    name: 'Universal Smart Watch Straps',
    category: 'Other Mobile Accessories',
    type: 'Wearables',
    brand: 'Generic',
    price: 300,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Watch+Straps',
    description: 'Stylish and durable watch straps, compatible with various smartwatches.',
  },
  {
    id: 'gs_p40',
    name: 'Santa Barbara Case for iPhone 15 & 16 Pro Max',
    category: 'Screen Guards & Back Covers',
    type: 'Back Covers',
    brand: 'Santa Barbara',
    compatibility: 'iPhone 15 Pro Max, iPhone 16 Pro Max',
    price: 499,
    image: 'https://placehold.co/400x400/03A9F4/ffffff?text=Santa+Barbara+Case',
    description: 'Premium Santa Barbara back case designed for iPhone 15 and 16 Pro Max.',
  },
  {
    id: 'gs_p41',
    name: 'Spigen Case for Various Models',
    category: 'Screen Guards & Back Covers',
    type: 'Hard Cases',
    brand: 'Spigen',
    compatibility: 'Various Models',
    price: 499,
    image: 'https://placehold.co/400x400/03A9F4/ffffff?text=Spigen+Case',
    description: 'Durable Spigen cases offering robust protection for a wide range of phone models.',
  },
  {
    id: 'gs_p42',
    name: 'Universal Silicone Cases',
    category: 'Screen Guards & Back Covers',
    type: 'Silicone Cases',
    brand: 'Generic',
    compatibility: 'Various Models',
    price: 250,
    image: 'https://placehold.co/400x400/03A9F4/ffffff?text=Silicone+Case',
    description: 'Soft-touch silicone cases providing basic protection for many smartphone models.',
  },
  {
    id: 'gs_p43',
    name: 'iPhone 13, 15 & 15 Plus Ladies Pouch',
    category: 'Screen Guards & Back Covers',
    type: 'Pouches & Wallets',
    brand: 'Generic',
    compatibility: 'iPhone 13, iPhone 15, iPhone 15 Plus',
    price: 450,
    image: 'https://placehold.co/400x400/03A9F4/ffffff?text=Ladies+Pouch',
    description: 'Stylish ladies pouch designed for iPhone 13, 15, and 15 Plus, with card slots.',
  },
  {
    id: 'gs_p44',
    name: 'OnePlus 9 Original Cover',
    category: 'Screen Guards & Back Covers',
    type: 'Back Covers',
    brand: 'OnePlus',
    compatibility: 'OnePlus 9',
    price: 499,
    image: 'https://placehold.co/400x400/03A9F4/ffffff?text=OnePlus+9+Cover',
    description: 'Original OnePlus 9 back cover, perfect fit and premium feel.',
  },
  {
    id: 'gs_p45',
    name: 'Polo Covers for Various Models',
    category: 'Screen Guards & Back Covers',
    type: 'Back Covers',
    brand: 'Polo',
    compatibility: 'Various Models',
    price: 350,
    image: 'https://placehold.co/400x400/03A9F4/ffffff?text=Polo+Cover',
    description: 'Stylish Polo branded back covers, available for a wide range of smartphone models.',
  },
  {
    id: 'gs_p46',
    name: 'iPhone Diamond Cut Screen Guard',
    category: 'Screen Guards & Back Covers',
    type: 'Screen Guards',
    brand: 'Generic',
    compatibility: 'iPhone (various models)',
    price: 350,
    image: 'https://placehold.co/400x400/03A9F4/ffffff?text=iPhone+Diamond+Guard',
    description: 'Diamond cut screen guard for iPhones, offering edge-to-edge protection and clarity.',
  },
  {
    id: 'gs_p47',
    name: 'Super X Screen Guards for Any Model',
    category: 'Screen Guards & Back Covers',
    type: 'Screen Guards',
    brand: 'Super X',
    compatibility: 'Various Models',
    price: 180,
    image: 'https://placehold.co/400x400/03A9F4/ffffff?text=Super+X+Guard',
    description: 'Basic screen guards from Super X, compatible with many smartphone models.',
  },
  {
    id: 'gs_p48',
    name: 'Universal UV Glass Screen Protector',
    category: 'Screen Guards & Back Covers',
    type: 'Tempered Glass',
    brand: 'Generic',
    compatibility: 'Various Models',
    price: 500,
    image: 'https://placehold.co/400x400/03A9F4/ffffff?text=UV+Glass',
    description: 'UV Liquid Dispenser tempered glass for edge-to-edge screen protection for curved displays.',
  },
  {
    id: 'gs_p49',
    name: 'Amazon Fire TV Stick with Alexa Voice Remote',
    category: 'Other Mobile Accessories',
    type: 'Smart Home Devices',
    brand: 'Amazon',
    price: 3999,
    image: 'https://placehold.co/400x400/607D8B/ffffff?text=Fire+TV+Stick',
    description: 'Stream movies and shows in HD with Alexa Voice Remote. Access thousands of apps.',
  },
  {
    id: 'gs_p50',
    name: 'Echo Dot 4th Gen Smart Speaker with Alexa',
    category: 'Audio Devices',
    type: 'Smart Speakers',
    brand: 'Amazon',
    price: 3999,
    image: 'https://placehold.co/400x400/FFC107/333333?text=Echo+Dot+4th+Gen',
    description: 'Compact smart speaker with Alexa. Control music, smart home devices, and more with your voice.',
  },
  {
    id: 'gs_p51',
    name: 'Titan S8 Wired Earphones 3.5mm Jack',
    category: 'Audio Devices',
    type: 'Wired Earphones',
    brand: 'Titan',
    price: 250,
    image: 'https://placehold.co/400x400/FFC107/333333?text=Titan+S8',
    description: 'Titan S8 wired earphones with 3.5mm jack for clear sound and comfortable fit.',
  },
  {
    id: 'gs_p52',
    name: 'itel Wireless Neckband N53F with FM Radio',
    category: 'Audio Devices',
    type: 'Neckbands',
    brand: 'itel',
    price: 999,
    image: 'https://placehold.co/400x400/FFC107/333333?text=itel+Neckband+N53F',
    description: 'itel wireless neckband with built-in FM radio, ideal for music on the go.',
  },
  {
    id: 'gs_p53',
    name: 'Zebronics Escape 20 Neckband',
    category: 'Audio Devices',
    type: 'Neckbands',
    brand: 'Zebronics',
    price: 999,
    image: 'https://placehold.co/400x400/FFC107/333333?text=Zebronics+Escape+20',
    description: 'Zebronics Escape 20 wireless neckband, lightweight design with good sound quality.',
  },
  // Smartwatches
  {
    id: 'gs_sw1',
    name: 'boAt Wave Lite Smart Watch (Non-Calling)',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'boAt',
    price: 1700,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=boAt+Wave+Lite',
    description: 'Lightweight boAt smartwatch with health tracking and notification alerts.',
  },
  {
    id: 'gs_sw2',
    name: 'Fastrack Revolt FS1 BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fastrack',
    price: 2499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fastrack+Revolt+FS1',
    description: 'Fastrack Revolt FS1 smartwatch with Bluetooth calling and multiple sports modes.',
  },
  {
    id: 'gs_sw3',
    name: 'Fastrack Revolt FS1 Pro Super AMOLED BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fastrack',
    price: 3999,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fastrack+Revolt+Pro',
    description: 'Premium Fastrack Revolt FS1 Pro smartwatch with Super AMOLED display and Bluetooth calling.',
  },
  {
    id: 'gs_sw4',
    name: 'Fire-Boltt Almighty BT Calling AMOLED Smartwatch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 2499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Almighty',
    description: 'Fire-Boltt Almighty smartwatch with AMOLED display and Bluetooth calling for convenience.',
  },
  {
    id: 'gs_sw5',
    name: 'Fire-Boltt Cobra BT Calling AMOLED Smartwatch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 1999,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Cobra',
    description: 'Rugged Fire-Boltt Cobra smartwatch with AMOLED display and Bluetooth calling.',
  },
  {
    id: 'gs_sw6',
    name: 'Fire-Boltt Collide BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 3499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Collide',
    description: 'Stylish Fire-Boltt Collide smartwatch with Bluetooth calling and comprehensive tracking.',
  },
  {
    id: 'gs_sw7',
    name: 'Fire-Boltt Cyclone BT Calling Always On Display Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 3800,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Cyclone',
    description: 'Fire-Boltt Cyclone smartwatch with always-on display and Bluetooth calling.',
  },
  {
    id: 'gs_sw8',
    name: 'Fire-Boltt Edge AMOLED BT Calling Smartwatch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 2499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Edge',
    description: 'Sleek Fire-Boltt Edge smartwatch with AMOLED display and Bluetooth calling.',
  },
  {
    id: 'gs_sw9',
    name: 'Fire-Boltt Emperor BT Calling AMOLED Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 3799,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Emperor',
    description: 'Luxury Fire-Boltt Emperor smartwatch with AMOLED display and Bluetooth calling.',
  },
  {
    id: 'gs_sw10',
    name: 'Fire-Boltt Gladiator Plus BT Calling AMOLED Smartwatch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 2499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Gladiator',
    description: 'Robust Fire-Boltt Gladiator Plus smartwatch with AMOLED display and BT calling.',
  },
  {
    id: 'gs_sw11',
    name: 'Fire-Boltt Orion BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 3000,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Orion',
    description: 'Sporty Fire-Boltt Orion smartwatch with Bluetooth calling and multi-sport modes.',
  },
  {
    id: 'gs_sw12',
    name: 'Fire-Boltt Phonex BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 2800,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Phonex',
    description: 'Fire-Boltt Phonex smartwatch with Bluetooth calling and elegant design.',
  },
  {
    id: 'gs_sw13',
    name: 'Fire-Boltt Supernova AMOLED BT Calling Smartwatch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 3300,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Supernova',
    description: 'Fire-Boltt Supernova smartwatch with vibrant AMOLED display and BT calling.',
  },
  {
    id: 'gs_sw14',
    name: 'Fire-Boltt Talk Luxe Edition BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 1999,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Talk+Luxe',
    description: 'Fire-Boltt Talk Luxe Edition smartwatch with premium metallic design and BT calling.',
  },
  {
    id: 'gs_sw15',
    name: 'Fire-Boltt Terminator 2 BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 2299,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Terminator',
    description: 'Tough Fire-Boltt Terminator 2 smartwatch with BT calling and rugged build.',
  },
  {
    id: 'gs_sw16',
    name: 'Fire-Boltt Topaz Luxe Edition Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 3500,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Topaz',
    description: 'Elegant Fire-Boltt Topaz Luxe Edition smartwatch with sophisticated design.',
  },
  {
    id: 'gs_sw17',
    name: 'Fire-Boltt Blizzard BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 1999,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Blizzard',
    description: 'Fire-Boltt Blizzard smartwatch with Bluetooth calling and classic round dial.',
  },
  {
    id: 'gs_sw18',
    name: 'Fire-Boltt Combat BT Calling Smartwatch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 2999,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Combat',
    description: 'Fire-Boltt Combat smartwatch for the adventurous, with BT calling and tough design.',
  },
  {
    id: 'gs_sw19',
    name: 'Fire-Boltt Vogue BT Calling Smartwatch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 2999,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Vogue',
    description: 'Fashionable Fire-Boltt Vogue smartwatch with BT calling and sleek form factor.',
  },
  {
    id: 'gs_sw20',
    name: 'Fire-Boltt Diablo 49.5mm BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 3499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Diablo',
    description: 'Fire-Boltt Diablo with large 49.5mm display, Bluetooth calling, and wireless charging.',
  },
  {
    id: 'gs_sw21',
    name: 'Fire-Boltt Ninja Call Pro Max Smart Watch (2.01")',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 1999,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Ninja+Pro+Max',
    description: 'Fire-Boltt Ninja Call Pro Max with large 2.01-inch display and Bluetooth calling.',
  },
  {
    id: 'gs_sw22',
    name: 'Fire-Boltt Ninja Call Pro Plus Smart Watch (1.83")',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 1799,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Ninja+Pro+Plus',
    description: 'Fire-Boltt Ninja Call Pro Plus with 1.83-inch display and Bluetooth calling.',
  },
  {
    id: 'gs_sw23',
    name: 'Fire-Boltt Royale Luxury Stainless Steel Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 4499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Royale',
    description: 'Luxury Fire-Boltt Royale smartwatch with stainless steel body and 1.43” AMOLED display.',
  },
  {
    id: 'gs_sw24',
    name: 'Fire-Boltt Talk 1.39" BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Fire-Boltt',
    price: 2499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Fire-Boltt+Talk',
    description: 'Fire-Boltt Talk smartwatch with 1.39" display, Bluetooth calling, SpO2 monitoring, and metal body.',
  },
  {
    id: 'gs_sw25',
    name: 'Hammer Fit Pro BT Calling 1.43" Super AMOLED Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'HAMMER',
    price: 2999,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Hammer+Fit+Pro',
    description: 'Hammer Fit Pro smartwatch with 1.43" Super AMOLED display and Bluetooth calling.',
  },
  {
    id: 'gs_sw26',
    name: 'Noise ColorFit Icon 2 BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Noise',
    price: 2500,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Noise+ColorFit+Icon+2',
    description: 'Noise ColorFit Icon 2 smartwatch with Bluetooth calling and stylish design.',
  },
  {
    id: 'gs_sw27',
    name: 'Noise Fit Arc BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Noise',
    price: 2800,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Noise+Fit+Arc',
    description: 'Noise Fit Arc smartwatch with Bluetooth calling and round dial.',
  },
  {
    id: 'gs_sw28',
    name: 'Pebble Cosmos Vogue 1.96" AMOLED Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Pebble',
    price: 2999,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Pebble+Cosmos+Vogue',
    description: 'Pebble Cosmos Vogue smartwatch with large 1.96" AMOLED display and premium features.',
  },
  {
    id: 'gs_sw29',
    name: 'Pebble Rise Pro Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Pebble',
    price: 2000,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Pebble+Rise+Pro',
    description: 'Pebble Rise Pro smartwatch with calling functionality and essential health tracking.',
  },
  {
    id: 'gs_sw30',
    name: 'Pebble Trio Special Edition BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Pebble',
    price: 3499,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Pebble+Trio+Special',
    description: 'Pebble Trio Special Edition smartwatch with Bluetooth calling and unique design.',
  },
  {
    id: 'gs_sw31',
    name: 'Pebble Wave BT Calling Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'Pebble',
    price: 2800,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=Pebble+Wave',
    description: 'Pebble Wave smartwatch with Bluetooth calling and sleek, modern aesthetic.',
  },
  {
    id: 'gs_sw32',
    name: 'TAGG Verve Neo Smart Watch (Non-Calling)',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'TAGG',
    price: 1800,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=TAGG+Verve+Neo',
    description: 'TAGG Verve Neo smartwatch for fitness tracking and notifications.',
  },
  {
    id: 'gs_sw33',
    name: 'boAt Ultima Call Max Smart Watch',
    category: 'Other Mobile Accessories',
    type: 'Smartwatches',
    brand: 'boAt',
    price: 2199,
    image: 'https://placehold.co/400x400/8BC34A/333333?text=boAt+Ultima+Call+Max',
    description: 'boAt Ultima Call Max smartwatch with 2" HD display and advanced calling features.',
  },
];

// Reusable Modal Component
const MessageModal = ({ show, title, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full transform transition-all scale-100 opacity-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ navigate, cartItemCount }) => (
  <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg sticky top-0 z-40">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-bold font-inter cursor-pointer" onClick={() => navigate('home')}>TMobiles</h1>
      <nav className="flex items-center space-x-6">
        <button className="flex items-center space-x-2 text-lg hover:text-blue-200 transition-colors" onClick={() => navigate('home')}>
          <Home size={20} /> <span>Home</span>
        </button>
        <button className="flex items-center space-x-2 text-lg hover:text-blue-200 transition-colors" onClick={() => navigate('products')}>
          <Store size={20} /> <span>Products</span>
        </button>
        <button className="flex items-center space-x-2 text-lg hover:text-blue-200 transition-colors" onClick={() => navigate('checkout')}>
          <ShoppingCart size={20} /> <span>Cart ({cartItemCount})</span>
        </button>
      </nav>
    </div>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        <a href="#about" className="hover:text-blue-400 transition-colors">About Us</a>
        <a href="#contact" className="hover:text-blue-400 transition-colors">Contact Us</a>
        <a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</a>
      </div>
      <p className="text-sm">© {new Date().getFullYear()} TMobiles - Mobile Accessories Store. All rights reserved.</p>
      <p className="text-sm mt-1">Mahabubnagar, Telangana, India</p>
    </div>
  </footer>
);

// Product Card Component
const ProductCard = ({ product, onAddToCart, onViewDetail }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 border border-gray-200 flex flex-col h-full">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover rounded-t-lg"
      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/cccccc/333333?text=Image+Not+Found`; }}
    />
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
      <p className="text-blue-700 font-bold text-xl mt-auto mb-4">₹{product.price.toLocaleString('en-IN')}</p>
      <div className="flex justify-between items-center space-x-2">
        <button
          onClick={() => onViewDetail(product)}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
        >
          View Details
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

// Home Page Component
const HomePage = ({ navigate, onAddToCart, onViewDetail }) => {
  const latestProducts = productsData.slice(0, 4); // Display first 4 as latest
  const offers = [
    { title: 'Flat 20% OFF on Back Covers!', description: 'Applicable for all back cover models.', image: 'https://placehold.co/600x300/fca5a5/7f1d1d?text=20%25+OFF' },
    { title: 'Buy 1 Get 1 Free on Select Headphones!', description: 'Limited time offer. Explore now!', image: 'https://placehold.co/600x300/a78bfa/4c0519?text=BOGO+Headphones' },
    { title: 'Exclusive 10% OFF on all Chargers!', description: 'For TMobiles Mahabubnagar customers.', image: 'https://placehold.co/600x300/93c5fd/1e3a8a?text=10%25+OFF+Chargers' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg shadow-xl p-8 md:p-12 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(https://placehold.co/1200x600/3b82f6/ffffff?text=Mobile+Accessories+Banner)' }}></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Your One-Stop Shop for Mobile Accessories
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Discover the latest trends and best deals at TMobiles!
          </p>
          <button
            onClick={() => navigate('products')}
            className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
          >
            Shop All Products
          </button>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Latest Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {latestProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewDetail={onViewDetail} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('products')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            View All Products
          </button>
        </div>
      </section>

      {/* Offers Section */}
      <section className="bg-blue-50 p-8 rounded-lg shadow-inner mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Exclusive Offers for Mahabubnagar!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x300/cccccc/333333?text=Offer+Image`; }} />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{offer.title}</h3>
                <p className="text-gray-700 text-sm">{offer.description}</p>
                <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium">
                  Claim Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose TMobiles?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <CheckCircle size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Products</h3>
            <p className="text-gray-600">Handpicked accessories for durability & performance.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <CreditCard size={40} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payments</h3>
            <p className="text-gray-600">Safe and encrypted transactions for peace of mind.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <Smartphone size={40} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Wide Selection</h3>
            <p className="text-gray-600">From covers to chargers, find everything you need.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Products Page Component
const ProductsPage = ({ onAddToCart, onViewDetail, initialCategory, initialType }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [selectedType, setSelectedType] = useState(initialType || 'All');
  const [searchTerm, setSearchTerm] = useState('');

  // Update state if initialCategory or initialType props change (e.g., from navigation)
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialType) setSelectedType(initialType);
  }, [initialCategory, initialType]);

  // Define categories and their types including new ones from the sheet
  const categories = [
    { name: 'All', icon: Store, types: ['All'] },
    { name: 'Screen Guards & Back Covers', icon: Smartphone, types: ['All', 'Screen Guards', 'Back Covers', 'Clear Cases', 'Hard Cases', 'Silicone Cases', 'Pouches & Wallets'] },
    { name: 'Audio Devices', icon: Headphones, types: ['All', 'Bluetooth Speakers', 'Sound Bars', 'Headphones', 'Airpods', 'Earbuds', 'Neckbands', 'Wired Earphones', 'Smart Speakers'] },
    { name: 'Chargers', icon: BatteryCharging, types: ['All', 'Samsung', 'Apple', 'Vivo', 'Realme', 'Redmi', 'Other Brands', 'Car Chargers'] },
    { name: 'Other Mobile Accessories', icon: Box, types: ['All', 'Power Banks', 'Car Accessories', 'Cables & Adapters', 'Phone Stands', 'Cleaning & Maintenance', 'Wearables', 'Grooming Devices', 'Photography Accessories', 'Portable Fans', 'Smartwatches', 'Smart Home Devices'] },
  ];

  const brands = [...new Set(productsData.map(p => p.brand))].sort();
  // Filter out undefined/null and empty strings from compatibility
  const compatibilities = [...new Set(productsData.map(p => p.compatibility).filter(Boolean).flatMap(c => c.split(',').map(s => s.trim())))].sort();

  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCompatibility, setSelectedCompatibility] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name-asc'); // Default sort by name ascending

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesType = selectedType === 'All' || product.type === selectedType;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    // Check if product's compatibility (which might be a comma-separated string) includes the selected compatibility
    const productCompatibilities = product.compatibility ? product.compatibility.split(',').map(s => s.trim()) : [];
    const matchesCompatibility = selectedCompatibility === 'All' || productCompatibilities.includes(selectedCompatibility);
    const matchesPrice = (minPrice === '' || product.price >= parseFloat(minPrice)) &&
                         (maxPrice === '' || product.price <= parseFloat(maxPrice));

    return matchesCategory && matchesType && matchesSearch && matchesBrand && matchesCompatibility && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const currentCategoryObj = categories.find(cat => cat.name === selectedCategory);
  const currentTypes = currentCategoryObj ? currentCategoryObj.types : [];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg lg:sticky lg:top-24 h-fit mb-8 lg:mb-0">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Categories</h3>
        <ul className="space-y-3 mb-8">
          {categories.map(category => (
            <li key={category.name}>
              <button
                onClick={() => {
                  setSelectedCategory(category.name);
                  setSelectedType('All'); // Reset type when category changes
                  setSearchTerm(''); // Clear search on category change
                  setSelectedBrand('All'); // Reset brand
                  setSelectedCompatibility('All'); // Reset compatibility
                }}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors flex items-center space-x-3
                  ${selectedCategory === category.name ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <category.icon size={18} />
                <span className="font-medium">{category.name}</span>
              </button>
            </li>
          ))}
        </ul>

        {selectedCategory !== 'All' && currentTypes.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Types ({selectedCategory})</h3>
            <ul className="space-y-3">
              {currentTypes.map(type => (
                <li key={type}>
                  <button
                    onClick={() => {
                      setSelectedType(type);
                      setSearchTerm(''); // Clear search on type change
                    }}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors
                      ${selectedType === type ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Filters */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Filters</h3>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Price Range (INR)</h4>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Brand</h4>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Compatibility Filter (only for relevant categories) */}
          {(selectedCategory === 'All' || selectedCategory === 'Screen Guards & Back Covers' || selectedCategory === 'Other Mobile Accessories') && compatibilities.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Compatibility (Phone Model)</h4>
              <select
                value={selectedCompatibility}
                onChange={(e) => setSelectedCompatibility(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Models</option>
                {compatibilities.map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </aside>

      {/* Main Product Display Area */}
      <main className="w-full lg:w-3/4 lg:pl-8">
        <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedType !== 'All' ? selectedType : selectedCategory}
          </h2>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-xl mt-12">No products found for your selection.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewDetail={onViewDetail} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// Product Detail Page Component
const ProductDetailPage = ({ product, onAddToCart, navigate }) => {
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600 text-xl">
        Product not found. <button onClick={() => navigate('products')} className="text-blue-600 hover:underline">Go to Products page</button>
      </div>
    );
  }

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm text-gray-600 mb-6">
        <button onClick={() => navigate('home')} className="hover:underline">Home</button> &gt;
        <button onClick={() => navigate('products', null, product.category, product.type)} className="hover:underline ml-1">
            {product.category} {product.type && product.type !== 'All' ? `(${product.type})` : ''}
        </button> &gt;
        <span className="ml-1 font-semibold">{product.name}</span>
      </nav>

      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md rounded-lg shadow-md object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x600/cccccc/333333?text=Image+Not+Found`; }}
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h2>
          <p className="text-gray-600 text-lg mb-2">
            {product.category} {product.type && product.type !== 'All' ? `- ${product.type}` : ''}
            {product.brand ? ` | Brand: ${product.brand}` : ''}
            {product.compatibility ? ` | For: ${product.compatibility}` : ''}
          </p>
          <p className="text-blue-700 font-bold text-4xl mb-6">₹{product.price.toLocaleString('en-IN')}</p>

          <p className="text-gray-800 text-base mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center space-x-4 mb-8">
            <label htmlFor="quantity" className="text-gray-700 font-medium">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => {
                onAddToCart(product, quantity);
                navigate('checkout'); // Automatically go to checkout after adding
              }}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                onAddToCart(product, quantity);
                navigate('checkout'); // Automatically go to checkout
              }}
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-md text-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Checkout Page Component
const CheckoutPage = ({ cartItems, onUpdateCartItem, onRemoveFromCart, onClearCart, navigate, showModal, modalContent, onCloseModal, onShowModal }) => {
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  // Removed paymentMethod state as it's now handled by Razorpay directly
  // const [paymentMethod, setPaymentMethod] = useState('upi');
  // const [upiId, setUpiId] = useState('');
  // const [cardNumber, setCardNumber] = useState('');
  // const [cardHolderName, setCardHolderName] = useState('');
  // const [expiryDate, setExpiryDate] = useState('');
  // const [cvv, setCvv] = useState('');
  // const [selectedBank, setSelectedBank] = useState('');

  const [currentPage, setCurrentPage] = useState(1); // 1: Cart, 2: Shipping, 3: Payment, 4: Review/Confirm

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCharge = subtotal > 0 ? 50 : 0; // Example: Flat 50 INR shipping
  const grandTotal = subtotal + shippingCharge;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      onShowModal('Cart Empty', 'Your cart is empty. Please add some products before checking out.');
      return;
    }
    setCurrentPage(2); // Go to Shipping
  };

  const handleProceedToPayment = () => {
    const { fullName, address1, city, state, pincode, phone } = shippingAddress;
    if (!fullName || !address1 || !city || !state || !pincode || !phone) {
      onShowModal('Missing Information', 'Please fill in all required shipping details.');
      return;
    }
    setCurrentPage(3); // Go to Payment (this will now be the Razorpay initiation step)
  };

  // Function to load the Razorpay script dynamically
  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-checkout-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-checkout-script';
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // New function to initiate Razorpay payment
  const initiateRazorpayPayment = async () => {
    // In a real application, you would make an API call to your backend
    // to create an order with Razorpay and get an order_id.
    // Example: const response = await fetch('/api/create-razorpay-order', { ... });
    // const { order_id } = await response.json();

    // For this demonstration, we simulate by directly opening Razorpay checkout
    // without a pre-generated order_id. This is NOT secure for production.
    // For production, you MUST generate order_id from your server.

    const scriptLoaded = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!scriptLoaded || typeof window.Razorpay === 'undefined') {
      onShowModal('Payment Error', 'Razorpay SDK failed to load. Please try again.');
      return;
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Test Key ID (e.g., 'rzp_test_YOUR_KEY')
                                   // Keep this client-side for testing/demo. For production, hide it.
      amount: grandTotal * 100, // amount in paise (e.g., 10000 = Rs 100)
      currency: 'INR',
      name: 'TMobiles Store',
      description: 'Purchase from TMobiles Mobile Accessories',
      // order_id: order_id, // In production, this would come from your backend
      handler: function (response) {
        // This function is called when the payment is successful
        // In a real application, you would send this `response` to your backend
        // for server-side verification using Razorpay APIs.
        console.log('Payment successful:', response);
        onShowModal('Order Placed!', 'Your payment was successful! Order confirmed.');
        onClearCart();
        setTimeout(() => navigate('home'), 3000);
      },
      prefill: {
        name: shippingAddress.fullName,
        email: 'customer@example.com', // Replace with actual customer email
        contact: shippingAddress.phone, // Replace with actual customer phone
      },
      notes: {
        address: `${shippingAddress.address1}, ${shippingAddress.city}, ${shippingAddress.state}`,
      },
      theme: {
        color: '#3B82F6', // Blue color for Razorpay modal
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      // This function is called if the payment fails
      console.error('Payment failed:', response);
      onShowModal('Payment Failed', `Payment could not be processed. Reason: ${response.error.description}`);
    });
    rzp1.open();
  };


  const renderCartItems = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center py-4">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center border-b border-gray-200 pb-4 last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/cccccc/333333?text=Item`; }}
                />
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-gray-600 text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center space-x-2 mr-4">
                  <button
                    onClick={() => onUpdateCartItem(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateCartItem(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={onClearCart}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors float-right"
          >
            Clear Cart
          </button>
          <div className="clear-both"></div>
        </>
      )}
    </div>
  );

  const renderShippingAddressForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={shippingAddress.fullName}
            onChange={handleAddressChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={shippingAddress.phone}
            onChange={handleAddressChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address1" className="block text-gray-700 text-sm font-bold mb-2">Address Line 1</label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={shippingAddress.address1}
            onChange={handleAddressChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address2" className="block text-gray-700 text-sm font-bold mb-2">Address Line 2 (Optional)</label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={shippingAddress.address2}
            onChange={handleAddressChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.city}
            onChange={handleAddressChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={shippingAddress.state}
            onChange={handleAddressChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={shippingAddress.pincode}
            onChange={handleAddressChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </form>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h3>
      <p className="text-sm text-gray-600 mb-4">
        We use Razorpay for secure payments. Click "Pay Now with Razorpay" to complete your purchase.
        <br/>
        <span className="font-semibold text-red-600">
            Note: For a real application, Razorpay integration requires a backend server to generate order IDs and verify payments securely.
            This demonstration is client-side only.
        </span>
      </p>

      {/* Simplified payment method selection for Razorpay */}
      <div className="text-center mt-6">
        <p className="text-lg text-gray-700">All payment options (UPI, Cards, Netbanking) will be available via Razorpay.</p>
      </div>
    </div>
  );

  const renderProgressSteps = () => (
    <div className="mb-8 flex justify-between text-center max-w-lg mx-auto">
      <div className={`flex-1 ${currentPage >= 1 ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>
        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentPage >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>1</div>
        Cart
      </div>
      <div className="flex-1 border-b-2 border-dashed border-gray-300 h-0 my-4 hidden sm:block"></div>
      <div className={`flex-1 ${currentPage >= 2 ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>
        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentPage >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>2</div>
        Shipping
      </div>
      <div className="flex-1 border-b-2 border-dashed border-gray-300 h-0 my-4 hidden sm:block"></div>
      <div className={`flex-1 ${currentPage >= 3 ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>
        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentPage >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>3</div>
        Payment
      </div>
      <div className="flex-1 border-b-2 border-dashed border-gray-300 h-0 my-4 hidden sm:block"></div>
      <div className={`flex-1 ${currentPage >= 4 ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>
        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${currentPage >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>4</div>
        Confirm
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Checkout</h2>
      {renderProgressSteps()}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area (Forms/Details) */}
        <div className="lg:w-2/3">
          {currentPage === 1 && renderCartItems()}
          {currentPage === 2 && renderShippingAddressForm()}
          {currentPage === 3 && renderPaymentMethods()}
          {currentPage === 4 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg mb-2">Shipping To:</h4>
                  <p>{shippingAddress.fullName}</p>
                  <p>{shippingAddress.address1}{shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</p>
                  <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                  <p>Phone: {shippingAddress.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg mb-2">Payment Method:</h4>
                  <p>Razorpay (various options will be available in the gateway)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg mb-2">Items:</h4>
                  {cartItems.map(item => (
                    <p key={item.id} className="text-gray-700">{item.name} x {item.quantity} = ₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary (Right Sidebar) */}
        <div className="lg:w-1/3 sticky top-24 h-fit">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{shippingCharge.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-gray-300 my-4 pt-4 flex justify-between font-bold text-lg text-gray-900">
                <span>Grand Total:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <input
              type="text"
              placeholder="Apply Coupon Code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-md mt-2 hover:bg-gray-300 transition-colors">Apply</button>

            {currentPage === 1 && (
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Shipping
              </button>
            )}
            {currentPage === 2 && (
              <div className="flex space-x-2 mt-6">
                 <button
                  onClick={() => setCurrentPage(1)}
                  className="flex-1 bg-gray-400 text-white py-3 rounded-md font-semibold text-lg hover:bg-gray-500 transition-colors"
                >
                  Back to Cart
                </button>
                <button
                  onClick={handleProceedToPayment}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            )}
            {currentPage === 3 && (
              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => setCurrentPage(2)}
                  className="flex-1 bg-gray-400 text-white py-3 rounded-md font-semibold text-lg hover:bg-gray-500 transition-colors"
                >
                  Back to Shipping
                </button>
                <button
                  onClick={initiateRazorpayPayment} // Changed to call Razorpay initiation
                  className="flex-1 bg-green-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-green-700 transition-colors"
                  disabled={grandTotal === 0} // Disable if total is 0
                >
                  Pay Now with Razorpay
                </button>
              </div>
            )}
            {currentPage === 4 && (
              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => setCurrentPage(3)}
                  className="flex-1 bg-gray-400 text-white py-3 rounded-md font-semibold text-lg hover:bg-gray-500 transition-colors"
                >
                  Back to Payment
                </button>
                {/* No direct "Place Order" button here, payment is handled by Razorpay modal */}
              </div>
            )}
          </div>
        </div>
      </div>
      <MessageModal show={showModal} title={modalContent.title} message={modalContent.message} onClose={onCloseModal} />
    </div>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [initialCategory, setInitialCategory] = useState(null);
  const [initialType, setInitialType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const navigate = (page, product = null, category = null, type = null) => {
    setCurrentPage(page);
    setSelectedProduct(product);
    setInitialCategory(category);
    setInitialType(type);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  const onAddToCart = (productToAdd, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity }];
      }
    });
    onShowModal('Item Added!', `${productToAdd.name} added to cart.`);
  };

  const onUpdateCartItem = (productId, newQuantity) => {
    if (newQuantity < 1) {
      onRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const onRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    onShowModal('Item Removed', 'Product removed from cart.');
  };

  const onClearCart = () => {
    setCartItems([]);
  };

  const onShowModal = (title, message) => {
    setModalContent({ title, message });
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setModalContent({ title: '', message: '' });
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
      <Header navigate={navigate} cartItemCount={cartItems.length} />
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage navigate={navigate} onAddToCart={onAddToCart} onViewDetail={(product) => navigate('productDetail', product)} />
        )}
        {currentPage === 'products' && (
          <ProductsPage
            onAddToCart={onAddToCart}
            onViewDetail={(product) => navigate('productDetail', product)}
            initialCategory={initialCategory}
            initialType={initialType}
          />
        )}
        {currentPage === 'productDetail' && (
          <ProductDetailPage product={selectedProduct} onAddToCart={onAddToCart} navigate={navigate} />
        )}
        {currentPage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onUpdateCartItem={onUpdateCartItem}
            onRemoveFromCart={onRemoveFromCart}
            onClearCart={onClearCart}
            navigate={navigate}
            showModal={showModal}
            modalContent={modalContent}
            onCloseModal={onCloseModal}
            onShowModal={onShowModal}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
