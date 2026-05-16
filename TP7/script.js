const API_BASE = 'https://rickandmortyapi.com/api/character';

document.getElementById('btnBuscar').addEventListener('click', buscarPersonaje);

document.getElementById('busqueda').addEventListener('keypress', function (e) {
    if (e.key == 'Enter') buscarPersonaje();
});

function buscarPersonaje() {

    const valor = document.getElementById('busqueda').value.trim();

    const resultado = document.getElementById('resultado');

    if (!valor) {
        mostrarMensaje(resultado, 'Por favor, ingrese un nombre o un ID', '');
        return;
    }

    mostrarCargando(resultado);

    const esNumero = /^\d+$/.test(valor);

    const url = esNumero
        ? `${API_BASE}/${valor}`
        : `${API_BASE}/?name=${encodeURIComponent(valor)}`;

    fetch(url)

        .then(function (response) {
            if (!response.ok) throw new Error('No encontrado');
            return response.json();
        })

        .then(function (data) {
            const personaje = esNumero ? data : data.results[0];
            mostrarCard(resultado, personaje);
        })

        .catch(function () {
            mostrarMensaje(resultado, 'Personaje no encontrado', 'Pruebe con otro nombre o ID');
        });

}

function mostrarCard(contenedor, personaje) {

    const statusMap = {
        'Alive': {clase: 'alive', badge: 'badge-alive'},
        'Dead': {clase: 'dead', badge: 'badge-dead'},
        'unknown': {clase: 'unknown', badge: 'badge-unknown'}
    };

    const estado = statusMap[personaje.status] || statusMap['unknown'];

    contenedor.innerHTML = `
        <div class="col-auto">
            <div class="personaje-card ${estado.clase}">
                <img
                    src="${personaje.image}"
                    alt="${personaje.name}"
                    class="card-img-personaje"
                >
                <div class="card-body-rm">
                    <h2 class="card-nombre">${personaje.name}</h2>
                    <div class="mb-3">
                        <span class="badge-estado ${estado.badge}">${personaje.status}</span>
                    </div>
                    <div class="info-row">
                        <p class="info-label mb-0">Especie</p>
                        <p class="info-value mb-0">${personaje.species}</p>
                    </div>
                    <div class="info-row">
                        <p class="info-label mb-0">Ultima ubicacion conocida</p>
                        <p class="info-value mb-0">${personaje.location.name}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function mostrarCargando(contenedor) {
    contenedor.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border" style="color: var(--rm-green);" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
    `;
}

function mostrarMensaje(contenedor, icono, texto, sub) {
    contenedor.innerHTML = `
        <div class="col-12 text-center">
            <div>
                <span class="msg-icon">${icono}</span>
                <p class="msg-texto mb-0">${texto}</p>
                ${sub ? `<p class="msg-sub mb-0">${sub}</p>`: ''}
            </div>
        </div>
    `;
}