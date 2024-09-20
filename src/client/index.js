import { handleSubmit } from './script/app.js';
import './styles/style.scss';

// التحقق من وجود الفورم قبل إضافة الـ event listener
const travelForm = document.getElementById('travelForm');
if (travelForm) {
    travelForm.addEventListener('submit', handleSubmit);
} else {
    console.error('Form with ID "travelForm" not found.');
}
