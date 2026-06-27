# 🌸 Bloom For You — Full Version

ของขวัญวันครบรอบแบบ Professional สำหรับคนพิเศษของคุณ

---

## ✨ ฟีเจอร์ทั้งหมด

| ฟีเจอร์ | คำอธิบาย |
|---------|----------|
| 🌸 Falling Petals | ดอกไม้ปลิวตลอด Canvas ทั้งหน้าจอ |
| ❤️ Heart Cursor | เคอร์เซอร์หัวใจตามเมาส์/สัมผัส |
| ⏳ Countdown | นับวัน ชั่วโมง นาที วินาทีที่อยู่ด้วยกัน |
| 💌 Typewriter Letter | จดหมายพิมพ์ทีละตัวแบบ Cinematic |
| 📸 Gallery + Lightbox | 6 ช่วงเวลา คลิกเพื่อดูรายละเอียด |
| 🌱 Garden Game | กดดอกไม้แต่ละดอกเพื่อ unlock ข้อความ |
| 🌹 Blooming SVG | ดอกไม้ค่อย ๆ บานแบบ Animation |
| 🎮 Mini Game | เกมจับดอกไม้ 20 วินาที |
| 🌙 Night Mode | หน้าสุดท้ายธีมกลางคืน |
| 🎉 Confetti | กระดาษสีร่วงเต็มจอในหน้าสุดท้าย |
| 💖 Rising Hearts | หัวใจลอยขึ้นในหน้าสุดท้าย |
| 🎵 Music Support | ใส่ไฟล์เพลงได้ทันที |
| 📱 Mobile Ready | รองรับมือถือเต็มรูปแบบ |
| ♿ Accessibility | Reduced motion, keyboard nav |

---

## 🛠️ การปรับแต่ง

เปิดไฟล์ `script.js` และแก้ `CONFIG` ที่ด้านบน:

```js
const CONFIG = {
  // วันที่เริ่มคบกัน (ปี, เดือน-1, วัน)
  anniversaryDate: new Date(2023, 5, 27),

  // จดหมาย (ใช้ \n ขึ้นบรรทัดใหม่)
  letterText: `...`,
  letterSign: "— Forever yours 💕",

  // 6 ช่วงเวลา
  gallery: [
    { emoji: "🌅", label: "ชื่อ", caption: "คำอธิบาย" },
    ...
  ],

  // 6 ดอกไม้พร้อมข้อความ
  gardenFlowers: [
    { emoji: "🌹", msg: "ข้อความ..." },
    ...
  ],

  // ข้อความบน Bloom SVG
  bloomMessage: "You make every day bloom 🌸",
};
```

---

## 🎵 ใส่เพลง

1. วางไฟล์ `music.mp3` ในโฟลเดอร์เดียวกับ `index.html`
2. เปิด `index.html` แล้ว uncomment บรรทัดนี้:

```html
<source src="music.mp3" type="audio/mpeg" />
```

---

## 📸 Gallery

ในเวอร์ชันนี้ใช้ Emoji แทนรูปจริง  
ถ้าต้องการใส่รูปจริง แก้ในไฟล์ `script.js`:

```js
gallery: [
  { img: "photo1.jpg", label: "วันแรก", caption: "..." },
  ...
]
```

แล้วแก้ CSS `.card-emoji` ให้เป็น `<img>` แทน

---

## 🗂️ โครงสร้างไฟล์

```
bloom-full/
├── index.html   — โครงสร้างหน้าเว็บ
├── style.css    — ทุก Style และ Animation
├── script.js    — Logic ทั้งหมด + CONFIG
└── README.md    — คู่มือนี้
```

---

Made with 💖 for someone very special.
