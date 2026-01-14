function switchTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    // Mostrar el tab seleccionado
    document.getElementById(tabName).classList.add('active');
    // Encontramos el botón que llamó a esta función buscando por texto o atributo si fuera necesario,
    // pero usaremos el event.target que es más directo si se pasa el evento,
    // aquí asumimos que el click pasa el evento implícitamente o buscamos el botón.
    // Una forma más segura sin pasar el evento explícitamente en el HTML:
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        if(btn.textContent.includes(tabName.toUpperCase()) ||
            (tabName === 'chain' && btn.textContent.includes('ENCADENAMIENTO')) ||
            (tabName === 'inmutable' && btn.textContent.includes('INMUTABILIDAD')) ||
            (tabName === 'api' && btn.textContent.includes('API'))) {
            btn.classList.add('active');
        }
    });
}

function ejecutarMap() {
    const misGatitos = [
        { nombre: 'Milo', edad: 1 },
        { nombre: 'Cleo', edad: 2 }
    ];

    const gatitosmasViejos = misGatitos.map((gatito) => ({
        ...gatito,
        edad: gatito.edad * 2
    }));

    const output = document.getElementById('output-map');
    output.innerHTML = `
    <div class="output-item">
      <div class="output-label">📦 Array Original:</div>
      <div class="value">${JSON.stringify(misGatitos, null, 2)}</div>
    </div>
    <div class="output-item">
      <div class="output-label">✨ Array Transformado (edad × 2):</div>
      <div class="value">${JSON.stringify(gatitosmasViejos, null, 2)}</div>
    </div>
    <div class="stat-box">
      <strong>✓ Datos originales intactos:</strong> Los gatos aún tienen su edad original
    </div>
  `;
}

function ejecutarFilter() {
    const poblacionGatuna = [
        { nombre: 'Salem', edad: 3 },
        { nombre: 'Kitty', edad: 1 },
        { nombre: 'Garfield', edad: 5 },
        { nombre: 'Whiskers', edad: 1 }
    ];

    const gatitosJovenes = poblacionGatuna.filter(gatito => gatito.edad < 2);

    const output = document.getElementById('output-filter');
    output.innerHTML = `
    <div class="output-item">
      <div class="output-label">📊 Total en la población:</div>
      <div class="value">${poblacionGatuna.length} gatos</div>
    </div>
    <div class="output-item">
      <div class="output-label">🐱 Gatos jóvenes (edad < 2):</div>
      <div class="value">${JSON.stringify(gatitosJovenes, null, 2)}</div>
    </div>
    <div class="stat-box">
      <strong>📈 Filtrados:</strong> ${gatitosJovenes.length} de ${poblacionGatuna.length} gatos
    </div>
  `;
}

function ejecutarReduce() {
    const puntosPorArañazo = [5, 10, 3, 7];
    const totalPuntos = puntosPorArañazo.reduce((acumulador, actual) => acumulador + actual, 0);

    // Mostrar paso a paso
    let pasos = '<div class="output-item"><div class="output-label">📋 Proceso paso a paso:</div>';
    let acumulador = 0;
    puntosPorArañazo.forEach((punto, i) => {
        acumulador += punto;
        pasos += `<div>Paso ${i + 1}: ${acumulador - punto} + ${punto} = <strong>${acumulador}</strong></div>`;
    });
    pasos += '</div>';

    const output = document.getElementById('output-reduce');
    output.innerHTML = `
    <div class="output-item">
      <div class="output-label">🎯 Array de puntos:</div>
      <div class="value">${JSON.stringify(puntosPorArañazo)}</div>
    </div>
    ${pasos}
    <div class="stat-box">
      <strong>🏆 Total Acumulado:</strong> ${totalPuntos} puntos
    </div>
  `;
}

function ejecutarChain() {
    const gatitosConPeso = [
        { nombre: 'Bolt', peso: 4 },
        { nombre: 'Puff', peso: 2 },
        { nombre: 'Shadow', peso: 5 },
        { nombre: 'Fluffy', peso: 3 }
    ];

    // Paso 1: Filter
    const filtrados = gatitosConPeso.filter(g => g.peso < 5);

    // Paso 2: Map
    const mapeados = filtrados.map(g => g.peso * 1.1);

    // Paso 3: Reduce
    const resultado = mapeados.reduce((acc, peso) => acc + peso, 0);

    const output = document.getElementById('output-chain');
    output.innerHTML = `
    <div class="output-item">
      <div class="output-label">1️⃣ FILTER - Gatos con peso < 5:</div>
      <div class="value">${JSON.stringify(filtrados, null, 2)}</div>
    </div>
    <div class="output-item">
      <div class="output-label">2️⃣ MAP - Aumentar peso 10%:</div>
      <div class="value">${JSON.stringify(mapeados.map((p, i) => ({ ...filtrados[i], pesoNuevo: p })), null, 2)}</div>
    </div>
    <div class="stat-box">
      <strong>3️⃣ REDUCE - Suma Total:</strong> ${resultado.toFixed(2)} kg
    </div>
  `;
}

function ejecutarAPI() {
    const output = document.getElementById('output-api');
    const loading = document.getElementById('loading-api');

    loading.style.display = 'block';
    output.innerHTML = '';

    fetch('https://api.thecatapi.com/v1/breeds')
        .then(res => res.json())
        .then(razas => {
            loading.style.display = 'none';

            const gatosTop = razas
                .filter(raza => raza.affection_level >= 4)
                .slice(0, 10);

            const fichaGatos = gatosTop.map(raza => ({
                raza: raza.name,
                origen: raza.origin,
                afecto: raza.affection_level,
                inteligencia: raza.intelligence,
            }));

            const promedioInteligencia = fichaGatos.reduce((suma, gato) => suma + gato.inteligencia, 0) / fichaGatos.length;

            let html = `
        <div class="output-item">
          <div class="output-label">📊 Estadísticas:</div>
          <div class="value">
            • Razas con afecto ≥ 4: ${gatosTop.length}<br>
            • Inteligencia promedio: ${promedioInteligencia.toFixed(1)}/5
          </div>
        </div>
        <div class="cat-gallery">
      `;

            fichaGatos.forEach(gato => {
                html += `
          <div class="cat-card">
            <h4>${gato.raza}</h4>
            <p>
              <strong>Origen:</strong> ${gato.origen}<br>
              <strong>Afecto:</strong> ${gato.afecto}/5<br>
              <strong>Inteligencia:</strong> ${gato.inteligencia}/5
            </p>
          </div>
        `;
            });

            html += '</div>';
            output.innerHTML = html;
        })
        .catch(err => {
            loading.style.display = 'none';
            output.innerHTML = `<div class="error">❌ Error al cargar datos: ${err.message}</div>`;
        });
}

function ejecutarInmutable() {
    const datosOriginales = [
        { id: 1, nombre: 'Producto A', stock: 10 },
        { id: 2, nombre: 'Producto B', stock: 5 }
    ];

    const datosModificados = datosOriginales.map(producto => ({
        ...producto,
        stock: producto.stock + 5
    }));

    const output = document.getElementById('output-inmutable');
    output.innerHTML = `
    <div class="comparison">
      <div class="comparison-item">
        <h4>📦 ORIGINAL (Sin cambios)</h4>
        <div class="value">${JSON.stringify(datosOriginales, null, 2)}</div>
      </div>
      <div class="comparison-item">
        <h4>✨ MODIFICADO (Nuevo array)</h4>
        <div class="value">${JSON.stringify(datosModificados, null, 2)}</div>
      </div>
    </div>
    <div class="stat-box">
      <strong>✓ Inmutabilidad garantizada:</strong> El array original NO fue modificado. Se creó uno nuevo.
    </div>
  `;
}

// Ejecutar Map al cargar
window.onload = () => {
    // Activar pestaña map por defecto
    switchTab('map');
    ejecutarMap();
};
