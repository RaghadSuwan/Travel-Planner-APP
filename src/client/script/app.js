const handleSubmit = async (event) => {
    event.preventDefault();

    const destination = document.getElementById('destination').value;

    const response = await fetch('http://localhost:8000/getImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination })
    });

    try {
        const data = await response.json();
        if (data.image) {
            document.getElementById('destinationImage').src = data.image;
        } else {
            document.getElementById('destinationImage').src = '';
            alert('Image not found for this destination.');
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

export { handleSubmit };
