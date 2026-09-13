const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(cors());

// متغير لحفظ أحدث تصميم للبيت يتم مسحه من نظارة الكويست
let latestHouseMap = null;

// استقبال بيانات المسح من موقعك الأول (Scan)
app.post('/api/save-house', (req, res) => {
    latestHouseMap = req.body;
    console.log('تم تحديث تصميم البيت بنجاح!');
    res.status(200).json({ success: true, message: 'تم حفظ التصميم على السيرفر' });
});

// إرسال التصميم للعبة
app.get('/api/get-house', (req, res) => {
    if (!latestHouseMap) {
        return res.status(404).json({ error: 'لا يوجد تصميم مسجل حتى الآن' });
    }
    res.json(latestHouseMap);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`السيرفر يعمل بنجاح على البورت ${PORT}`);
});
