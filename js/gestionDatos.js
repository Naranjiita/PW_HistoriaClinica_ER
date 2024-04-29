
/*PARTE DE DATOS PERSONALES************************************************************************************/
var btnCambiarFoto = document.getElementById('btnCambiarFoto'),
    txtNombreCompleto = document.getElementById('nombreCompleto'),
    txtDireccion = document.getElementById('direccion'),
    txtTelefono = document.getElementById('telefono'),
    txtCedula = document.getElementById('cedula');


//Validación de entradas
function validarCampo(input, mensaje) {
    if (input.value == '') {
        alert(mensaje);
    }
}
function validarCedula(cedula) {
    // Validar que la cédula tenga 10 dígitos
    if (cedula.length !== 10 || isNaN(cedula)) {
        return false;
    }

    // Obtener el dígito verificador
    const digitoVerificador = parseInt(cedula.substring(9, 10));

    // Sumar los dígitos en posiciones pares
    let sumaPares = 0;
    for (let i = 0; i < 9; i += 2) {
        let digito = parseInt(cedula.charAt(i)) * 2;
        if (digito > 9) {
            digito -= 9;
        }
        sumaPares += digito;
    }

    // Sumar los dígitos en posiciones impares
    let sumaImpares = 0;
    for (let i = 1; i < 8; i += 2) {
        sumaImpares += parseInt(cedula.charAt(i));
    }

    // Sumar las sumas parciales
    const total = sumaPares + sumaImpares;

    // Obtener el último dígito
    const ultimoDigito = (total % 10 === 0) ? 0 : 10 - (total % 10);

    // Validar que el último dígito coincida con el dígito verificador
    return ultimoDigito === digitoVerificador;
}

txtNombreCompleto.addEventListener('blur', function () {
    validarCampo(txtNombreCompleto, 'El nombre no puede estar vacío');
});
txtDireccion.addEventListener('blur', function () {
    validarCampo(txtDireccion, 'La dirección no puede estar vacía');
});
txtTelefono.addEventListener('blur', function () {
    validarCampo(txtTelefono, 'El teléfono no puede estar vacío');
});
txtCedula.addEventListener('blur', function () {
    validarCampo(txtCedula, 'La cédula no puede estar vacía');
});

//Validación de 10 números en el campo de teléfono despues de que el usuario quite el foco
txtTelefono.addEventListener('blur', function () {
    if (txtTelefono.value.length != 10) {
        alert('El teléfono debe tener 10 dígitos');
        //Volvemos a poner el valor por defecto
        txtTelefono.value = 'Telefono';
    }
});

//Validación de 10 números en el campo de cédula despues de que el usuario quite el foco 
txtCedula.addEventListener('blur', function () {
    if (txtCedula.value.length != 10) {
        alert('La cédula debe tener 10 dígitos');
        //Volvemos a poner el valor por defecto
        txtCedula.value = 'Cédula';
    }
});

//Validación si es cedula ecuatoriana
txtCedula.addEventListener('blur', function () {
    if (!validarCedula(txtCedula.value)) {
        alert('La cédula no es válida');
        //Volvemos a poner el valor por defecto
        txtCedula.value = 'Cédula';
    }
});

//Cambiar la foto de perfil
btnCambiarFoto.addEventListener('click', function () {
    //Vamos  hacer que eliga un archivo jpg o png de las carpetas del usuario
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = function () { //Cuando se seleccione la imagen
        let file = input.files[0]; //Obtenemos el archivo
        let reader = new FileReader(); //Creamos un objeto de lectura
        reader.readAsDataURL(file); //Leemos el archivo
        reader.onload = function () { //Cuando se haya leido
            let img = document.getElementById('fotoPerfil'); //Obtenemos la imagen
            img.src = reader.result; //Cambiamos la imagen
        };

    };
});


/*PARTE DE DATOS DE NACIMIENTO**********************************************************************************************/
let boxCambiarFechaN = document.getElementById('btnCambiarFechaN'),
    comboBoxPais = document.getElementById('comboBoxPais'),
    comboBoxCiudad = document.getElementById('comboBoxCiudad');
//borramos todas las OPCIONES de la ciudad cuando se carga la página menos la primera
comboBoxCiudad.innerHTML = '<option value="0">Seleccione una ciudad</option>';
//Validación de entradas
//En el  boxCambiarFechaN  no puede elegir una fecha que no sea mayor a la actual
boxCambiarFechaN.addEventListener('change', function () {
    let fechaNacimiento = document.getElementById('btnCambiarFechaN').value; //Obtenemos la fecha de nacimiento en formato YYYY-MM-DD
    let fechaActual = new Date(); //Obtenemos la fecha actual
    let fechaNacimientoDate = new Date(`${fechaNacimiento}T00:00:00Z`); //Convertimos la fecha de nacimiento a un objeto Date en UTC
    console.log(fechaNacimientoDate);
    if (fechaNacimientoDate >= fechaActual) {
        alert('La fecha de nacimiento no puede ser mayor a la actual');
        //Volvemos a poner la fecha por defecto
        boxCambiarFechaN.value = '';
    }
});

//Una vez elegida la fecha de nacimiento, se realizará el calculo de la edad del usuario en horas,dias,meses y years y redondeamos a enteros
boxCambiarFechaN.addEventListener('change', function () {
    let fechaNacimiento = document.getElementById('btnCambiarFechaN').value; //Obtenemos la fecha de nacimiento en formato YYYY-MM-DD
    let fechaNacimientoDate = new Date(`${fechaNacimiento}T00:00:00Z`); //Convertimos la fecha de nacimiento a un objeto Date en UTC
    let fechaActual = new Date(); //Obtenemos la fecha actual
    let diferencia = fechaActual - fechaNacimientoDate; //Calculamos la diferencia en milisegundos
    let segundos = Math.floor(diferencia / 1000); //Calculamos los segundos
    let minutos = Math.floor(segundos / 60); //Calculamos los minutos
    let horas = Math.floor(minutos / 60); //Calculamos las horas
    let dias = Math.floor(horas / 24); //Calculamos los días
    let meses = Math.floor(dias / 30); //Calculamos los meses
    let years = Math.floor(meses / 12); //Calculamos los años
    //Mostramos la edad en horas,dias,meses y años
    document.getElementById('edadCalculada').innerHTML = `${horas} horas, ${dias-1} días, ${meses} meses, ${years} años`;
});

//Modificamos las opciones de la ciudad dependiendo del país
comboBoxPais.addEventListener('change', function () {
    let pais = comboBoxPais.value; //Obtenemos el valor del país
    //Borramos todas las opciones de la ciudad
    comboBoxCiudad.innerHTML = '<option value="0">Seleccione una ciudad</option>';
    //Agregamos las opciones de la ciudad dependiendo del país
    if (pais == 'Ecuador') {
        comboBoxCiudad.innerHTML += '<option value="1">Quito</option>';
        comboBoxCiudad.innerHTML += '<option value="2">Guayaquil</option>';
        comboBoxCiudad.innerHTML += '<option value="3">Cuenca</option>';
    } else if (pais == 'Colombia') {
        comboBoxCiudad.innerHTML += '<option value="1">Bogotá</option>';
        comboBoxCiudad.innerHTML += '<option value="2">Medellín</option>';
        comboBoxCiudad.innerHTML += '<option value="3">Cali</option>';
    } else if (pais == 'México') {
        comboBoxCiudad.innerHTML += '<option value="1">Ciudad de México</option>';
        comboBoxCiudad.innerHTML += '<option value="2">Guadalajara</option>';
        comboBoxCiudad.innerHTML += '<option value="3">Monterrey</option>';
    }
});


/*PARTE DE DATOS DE LOS HIJOS**********************************************************************************************/
/*Cuando de click en el botón de Agregar Fila saldra una ventana emergente para recoger los campos de los hijos, despues se crea una
 nueva fila en la tabla antes del footer y luego actualiza diciendo que el Total de hijos es el número de filas. */
// JavaScript
let btnAgregarFila = document.getElementById('btnAgregarFila');
let btnEliminarFila = document.getElementById('btnEliminarFila');
let tablaHijos = document.getElementById('tablaHijos');
let totalHijos = document.getElementById('totalHijos');

// Función para mostrar el cuadro de diálogo y recopilar los campos de los hijos
function agregarFila() {
    // Mostrar cuadro de diálogo y recopilar los campos del hijo
    let nombre = prompt('Ingrese el nombre del hijo');
    let direccion = prompt('Ingrese la dirección del hijo');
    let telefono = prompt('Ingrese el teléfono del hijo');

    //obtenemos el número de filas de la tabla sin contar el header y el footer
    let numFilas = tablaHijos.rows.length - 2;

    // Crear una nueva fila en la tabla antes del footer
    let nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-light">${numFilas+1}</td>
        <td class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-light">${nombre}</td>
        <td class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-light">${direccion}</td>
        <td class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-light">${telefono}</td>
    `;
    tablaHijos.insertBefore(nuevaFila, tablaHijos.lastElementChild);

    // Actualizar el total de hijos
    totalHijos.textContent = `Total de hijos: ${tablaHijos.rows.length - 2}`;


}
function eliminarFila(){
//Solicitamos con una venta emergente que ingrese el número que tenga el hijo que desea eliminar
let numeroHijo = prompt('Ingrese el número del hijo que desea eliminar');
//Obtenemos el número de filas de la tabla sin contar el header y el footer
let numFilas = tablaHijos.rows.length ;
// Si es que el número de hijo es mayor al número de filas o es menor a 1, mostramos un mensaje de error, que vuelva a intentar
if(numeroHijo > numFilas || numeroHijo < 1){
    alert('Número de hijo incorrecto. Vuelva a intentar');
    return;
}else{
   //Encontramos la fila que quiere eliminar  de acuerdo con el campo en la primera columna que sea igual al número de hijo que ingreso
    for(let i = 1; i < tablaHijos.rows.length - 1; i++){
        if(tablaHijos.rows[i].cells[0].textContent == numeroHijo){
            tablaHijos.deleteRow(i);
            break;
        }
    }

  
    // Actualizar el total de hijos
    totalHijos.textContent = `Total de hijos: ${tablaHijos.rows.length - 2}`;
}


}

// Agregar evento de clic al botón "Agregar Fila"
btnAgregarFila.addEventListener('click', agregarFila);
btnEliminarFila.addEventListener('click', eliminarFila);

/*PARTE DE DATOS DE LOS CONSULTAS REGISTRADAS**********************************************************************************************/

//Simplemente si presiona el boton cont_RegistrosConsultas se borran todas las filas  sin contar el header y el footer
let cont_RegistrosConsultas = document.getElementById('cont_RegistrosConsultas');
cont_RegistrosConsultas.addEventListener('click', function () {
    let tablaConsultas = document.getElementById('tablaConsultas');
    //Borramos todas las filas de la tabla sin contar el header y el footer
    tablaConsultas.innerHTML = `
        <tr>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-bold">Fecha</th>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-bold">Hora</th>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-bold">Médico</th>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-bold">Especialidad</th>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-bold">Consultorio</th>
        </tr>
        <tr>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-light h-10"></th>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-light h-10"></th>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-light h-10"></th>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-light h-10"></th>
            <th class="border sm:px-4  px-2 py-2 text-center text-xs sm:text-lg font-light h-10"></th>
        </tr>
        <tr>
                            <td class="px-2 py-4 bg-gray-50" colspan="3">Total de consultas: 5</td> <!-- Celda con el texto "Total de consultas: 3" -->
                            <td class="py-4 bg-gray-50 text-right">
                                <button id="cont_RegistrosConsultas" class="px-6  hover:bg-blue-700  font-bold font-family-Poppins text-xs sm:w-10 sm:h-10  py-2 rounded-lg">
                                    <img src="../img/flecha-derecha.png" alt="Descripción de la imagen" class="w-5 h-5 mr-2" />
                                    
                                </button> <!-- Botón "Avanzar" -->
                            </td>
                        </tr>
    `;
});








