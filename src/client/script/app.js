import axios from 'axios'; // استيراد axios

const handleSubmit = async (event) => {
    event.preventDefault();

    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('date').value;
    const endDate = document.getElementById('endDate').value;

    // حساب مدة الرحلة
    const tripDuration = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    // إظهار مؤشر التحميل
    document.getElementById('loader').style.display = 'block';

    try {
        // جلب بيانات الطقس باستخدام axios
        const weatherResponse = await axios.post('http://localhost:8000/getWeather', {
            destination
        });
        const weatherData = weatherResponse.data;

        // تحديث معلومات الطقس في الصفحة
        if (weatherData) {
            document.getElementById('temp').innerText = `Temperature: ${weatherData.temp}°C`;
            document.getElementById('description').innerText = `Description: ${weatherData.description}`;
        }

        // جلب صورة الوجهة باستخدام axios
        const imageResponse = await axios.post('http://localhost:8000/getImage', {
            destination
        });
        const imageData = imageResponse.data;

        // عرض الصورة في الصفحة
        if (imageData.image) {
            document.getElementById('destinationImage').src = imageData.image;
        } else {
            document.getElementById('destinationImage').src = '';
            alert('Image not found for this destination.');
        }

        // عرض مدة الرحلة
        document.getElementById('tripDuration').innerText = `Your trip is ${tripDuration} days long.`;

    } catch (error) {
        console.log('Error:', error);
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').innerText = 'An error occurred while fetching data.';
    } finally {
        // إخفاء مؤشر التحميل
        document.getElementById('loader').style.display = 'none';
    }
};

export { handleSubmit };
