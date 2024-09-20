import axios from 'axios'; // استيراد axios

// كائن رئيسي يحتوي على القيم الافتراضية للرحلة
const tripData = {
    destination: '',
    startDate: '',
    endDate: '',
    temp: '',
    description: '',
    image: '',
    tripDuration: 0
};

// الدالة الرئيسية للتعامل مع إرسال البيانات
const handleSubmit = async (event) => {
    event.preventDefault();

    // تحديث بيانات الرحلة
    tripData.destination = document.getElementById('destination').value;
    tripData.startDate = document.getElementById('date').value;
    tripData.endDate = document.getElementById('endDate').value;

    // حساب مدة الرحلة
    tripData.tripDuration = (new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24);

    // إظهار مؤشر التحميل
    document.getElementById('loader').style.display = 'block';

    try {
        // جلب بيانات الطقس باستخدام axios
        const weatherResponse = await axios.post('http://localhost:8000/getWeather', {
            destination: tripData.destination
        });
        const weatherData = weatherResponse.data;

        // تحديث معلومات الطقس في الصفحة
        if (weatherData) {
            tripData.temp = weatherData.temp;
            tripData.description = weatherData.description;
            document.getElementById('temp').innerText = `Temperature: ${tripData.temp}°C`;
            document.getElementById('description').innerText = `Description: ${tripData.description}`;
        }

        // جلب صورة الوجهة باستخدام axios
        const imageResponse = await axios.post('http://localhost:8000/getImage', {
            destination: tripData.destination
        });
        const imageData = imageResponse.data;

        // عرض الصورة في الصفحة
        if (imageData.image) {
            tripData.image = imageData.image;
            document.getElementById('destinationImage').src = tripData.image;
        } else {
            document.getElementById('destinationImage').src = '';
            alert('Image not found for this destination.');
        }

        // عرض مدة الرحلة
        document.getElementById('tripDuration').innerText = `Your trip is ${tripData.tripDuration} days long.`;

    } catch (error) {
        console.log('Error:', error);
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerText = 'An error occurred while fetching data.';
    } finally {
        // إخفاء مؤشر التحميل
        document.getElementById('loader').style.display = 'none';
    }
};

// تصدير الدالة لتُستخدم في index.js
export { handleSubmit };