function loadData(){
    let request = sendRequest('conjunto/list','GET','');
    let table = document.getElementById('conjuntos-table');
    table.innerHTML = "";
    request.onload = function(){
        let data = request.response;
        console.log(data);
        data.forEach((element,index) => {
            table.innerHTML += `
            <tr>
                <td>${element.ID_ConjuntoResidencial}</td>
                <td>${element.NombreConjuntoResidencial}</td>
                <td>${element.Telefono}</td>
                <td>${element.Email}</td>
                <td>
                    <button type="button" class="btn btn-primary" onclick="window.location = '/Administracion.com.html?id=${element.ID_ConjuntoResidencial}'">
                        Editar
                    </button>
                    <button type="button" class="btn btn-danger" onclick="deleteConjuntoRes${element.ID_ConjuntoResidencial})">
                        Eliminar
                    </button>
                </td>
            </tr>`
        });
    }
    request.onerror = function(){
        table.innerHTML = `
        <tr>
            <td colspan="6">Error al recuperar los datos</td>
        </tr>`;
    }
}
function loadConjuntoRes(ID_ConjuntoResidencial){
    let request = sendRequest('conjunto/list' + ID_ConjuntoResidencial, 'GET', '');
    let nomConjunto = document.getElementById("tipo-ident")
    let telefono = document.getElementById("tipo-telefono")
    let email = document.getElementById("tipo-email")
    let id = document.getElementById("conjunto-id")
    request.onload = function(){
        let data = request.response
        id.value =  data.id_Conjunto
        nomConjunto.value = data.nomConjunto
        telefono.value = data.telefono
        email.value = data.email
    }
    request.onerror = function(){
        alert("Error al recuperar los datos")
    }
}
function deleteConjuntoRes(ID_ConjuntoResidencial){
    let request = sendRequest('Conjunto/'+ID_ConjuntoResidencial, 'DELETE', '')
    request.onload = function(){
        loadData();
    }
}
function saveConjuntoRes(){
    let nomConjunto = document.getElementById("tipo-ident").value
    let telefono = document.getElementById("tipo-telefono").value
    let email = document.getElementById("tipo-email").value
    let id = document.getElementById("conjunto-id").value
    let data = {"conjunto-id":id, "tipo-ident":nomConjunto,"tipo-telefono":telefono,"tipo-email":email};
    let request = sendRequest('conjunto/',id ? 'POST':'PUT', data)
    request.onload = function(){
        window.location = 'administracion.html';
    }
    request.onerror = function(){
        alert('Error al guardar los datos')
    }
}
function editarConjuntoRes(){
    let nomConjunto = document.getElementById("tipo-ident").value
    let telefono = document.getElementById("tipo-telefono")
    let email = document.getElementById("tipo-email").value
    let id = document.getElementById("conjunto-id").value
    let data = {"conjunto-id":id, "tipo-ident":nomConjunto,"tipo-telefono":telefono,"tipo-email":email};
    let request = sendRequest('conjunto/',id ? 'PUT':'POST', data)
    request.onload = function(){
        window.location = 'administracion.html';
    }
    request.onerror = function(){
        alert('Error al guardar los datos')
    }
}