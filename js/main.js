
const botonLoad = document.getElementById('btnLoad');
const campoEmail = document.getElementById('email');

botonLoad.addEventListener("click", ()=>{
    let inputEmail = document.getElementById('email').value;
    const contenedor = document.getElementById('app');
    const bienvenida = document.getElementById('bienvenida');
    const params = new URLSearchParams({
        email: inputEmail
    })
    const url = `http://localhost:8000/api/infoEstudiantePerfil?${params}`; 
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(respose=>respose.json())
        .then((result) => {
            if (result.status == "true") {
                const { NAME, apellidos } = result.data_solicitud[0].Informacion_general[0];
                bienvenida.innerHTML = `Hola ${NAME} ${apellidos} List@ para aprender :)`;
                const asignaturas = result.data_solicitud[0].Asignatura_estudiante;
                for (let i = 0; i < asignaturas.length; i++) {
                    const { materia,nombreAsignatura, descripcion } = asignaturas[i];
                    const templateData = `
                    <div class="card col-5 col-md-3 m-1 p-2">
                        <img src="./img/${materia}.png" class="card-img-top" alt="asigantura">
                        <div class="card-body">
                            <h5 class="card-title">${nombreAsignatura}</h5>
                            <p class="card-text">${descripcion}</p>
                        </div>
                    </div>
                    `;
                    contenedor.innerHTML += templateData;
                    document.getElementById('email').value = "";
                }
            }else{
                alert(result.data_solicitud);
            }
        })
        .catch((err) => {
            console.error(err);
        })
});

campoEmail.addEventListener('keyup', ()=>{
    const clearApp = document.getElementById('app');
    const clearWelcome = document.getElementById('bienvenida');
    clearApp.innerHTML = "";
    clearWelcome.innerHTML = "";
});


