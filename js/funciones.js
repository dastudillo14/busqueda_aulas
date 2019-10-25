//global var
//iniciar cargando horario del lunes
var dia = 'lunes', ruta = '';
ruta = 'horarios/'+dia.toUpperCase()+'.csv';
leer(ruta);
var matriz = [];
//
//cambio de dia para cargar csv
$("#dia").change(function(){
	matriz=[];
    dia = document.getElementById("dia").value;  
    ruta = 'horarios/'+dia.toUpperCase()+'.csv';
    leer(ruta);
     });

function busqueda(){
	var texto = document.getElementById("caja").value;	
	var parametros = {
		"texto":texto
	};
	$.ajax({
		data:parametros, 
		url : buscar(texto.toUpperCase(),recorrer(matriz)),
		type: "POST",	
	});
}

function buscar(texto ,arreglo){
	var mid = document.getElementById("datos");
var tabla =" <table class='table table-hover'><tr style = 'color:Skyblue'><td>Día</td><td>Hora</td><td>Materia-Docente</td><td>Curso</td><td>Ubicación</td><tr>";
	var hora  = [], mate_doc  = [], curso  = [], lugar = [];
	
	for (var j = 0; j <=arreglo.length-1; j++){
		hora.push(arreglo[j][0]);
		mate_doc.push(arreglo[j][1]);
		curso.push(arreglo[j][2]);
		lugar.push(arreglo[j][3]);
	}
	for (var i = 2; i < curso.length ; i++) {
		if (mate_doc[i].indexOf(texto)!= -1 || curso[i].indexOf(texto)!= -1) {
			tabla +=  "<tr><td>"+dia.toUpperCase()+" </td><td>"+hora[i]+" </td> <td>"+mate_doc[i]+" </td><td>"+curso[i]+" </td><td> <a href='lugares/"+lugar[i]+".PNG'>"+lugar[i]+"</a> </td></tr>";		
		}
	}
	tabla += "</table> ";
	mid.innerHTML = tabla;
}
//leer csv
function leer(ruta){
	ruta = 'horarios/'+dia.toUpperCase()+'.csv';
	fetch(ruta)
	.then(res=> res.text())
	.then(content=> {
	let lines = content.split(/\n/);
	lines.forEach(line => matriz.push(line));
		}
	);	
//fin
}
	

function recorrer(matriz){
	var nuevo = [];
	var horas = [];
	var n = "";
	var arreglo = [];
	for (var i = 0; i <=matriz.length-2; i++) {
		arreglo.push(matriz[i].split(","));
	}
	return arreglo;
}

