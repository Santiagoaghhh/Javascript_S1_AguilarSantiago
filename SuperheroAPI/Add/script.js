async function fetchAPI() {
    try {
        const res = await fetch('https://681a35ae1ac1155635083dd2.mockapi.io/api/v1/data');
        let data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error character', error);
    }
}
fetchAPI();

async function agegarPersonaje(event) {
    event.preventDefault();

    const nuevoHeroe = {
        personaje: document.getElementById('nombrePersonaje').value,
        actor: document.getElementById('nombreActor').value,
        edad: document.getElementById('edadActor').value,
        ubicacion: document.getElementById('ubicacion').value,
        poster: document.getElementById('poster').value,
        fecha: document.getElementById('fecha').value,
        productora: document.getElementById('productora').value
    };

    try {
        const resP = await fetch('https://681a35ae1ac1155635083dd2.mockapi.io/api/v1/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoHeroe)
        });

        const data = await resP.json();
        console.log('Héroe guardado:', data);
        alert('Héroe guardado exitosamente ');

        document.getElementById('formularioHeroe').reset(); // Limpiar el formulario
    } catch (error) {
        console.error('Error al guardar héroe:', error);
        alert('Error al guardar héroe');
    }
}

document.getElementById('formularioHeroe').addEventListener('submit', agegarPersonaje);

