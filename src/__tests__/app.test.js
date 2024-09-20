import axios from 'axios';
import { handleSubmit } from '../client/script/app';

// محاكاة axios باستخدام Jest
jest.mock('axios');

describe('Test handleSubmit function', () => {
    let event;

    beforeEach(() => {
        // إعداد الحدث المزيف للـ form
        event = {
            preventDefault: jest.fn(),
        };

        // إعداد DOM مزيف لعناصر HTML
        document.body.innerHTML = `
            <form id="travelForm">
                <input type="text" id="destination" value="Paris"/>
                <input type="date" id="date" value="2023-09-20"/>
                <input type="date" id="endDate" value="2023-09-25"/>
            </form>
            <div id="loader" style="display: none;"></div>
            <div id="temp"></div>
            <div id="description"></div>
            <img id="destinationImage" src="" alt="Destination Image"/>
            <div id="tripDuration"></div>
            <div id="error" style="display: none;"></div>
        `;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should display weather and image data when APIs return valid data', async () => {
        // بيانات الطقس المحاكية
        const mockWeatherResponse = {
            data: {
                temp: 20,
                description: 'Clear sky'
            }
        };

        // بيانات الصورة المحاكية
        const mockImageResponse = {
            data: {
                image: 'https://example.com/paris.jpg'
            }
        };

        // محاكاة طلبات axios
        axios.post
            .mockResolvedValueOnce({ data: mockWeatherResponse.data })  // محاكاة رد API الطقس
            .mockResolvedValueOnce({ data: mockImageResponse.data });   // محاكاة رد API الصور

        await handleSubmit(event);

        // تحقق من عرض البيانات على الصفحة
        expect(document.getElementById('temp').innerText).toBe('Temperature: 20°C');
        expect(document.getElementById('description').innerText).toBe('Description: Clear sky');
        expect(document.getElementById('destinationImage').src).toBe('https://example.com/paris.jpg');
        expect(document.getElementById('tripDuration').innerText).toBe('Your trip is 5 days long.');
    });

    test('should display error message when API request fails', async () => {
        // محاكاة خطأ في API
        axios.post.mockRejectedValue(new Error('API request failed'));

        await handleSubmit(event);

        // تحقق من عرض رسالة الخطأ
        expect(document.getElementById('error').style.display).toBe('block');
        expect(document.getElementById('error').innerText).toBe('An error occurred while fetching data.');
    });

    test('should calculate trip duration correctly', async () => {
        // محاكاة رد API الطقس والصورة
        const mockWeatherResponse = { data: { temp: 20, description: 'Clear sky' } };
        const mockImageResponse = { data: { image: 'https://example.com/paris.jpg' } };

        axios.post
            .mockResolvedValueOnce({ data: mockWeatherResponse.data })
            .mockResolvedValueOnce({ data: mockImageResponse.data });

        await handleSubmit(event);

        // تحقق من حساب مدة الرحلة بشكل صحيح
        expect(document.getElementById('tripDuration').innerText).toBe('Your trip is 5 days long.');
    });
});