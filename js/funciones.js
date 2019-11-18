//iniciar cargando busqueda todos
var dias = ['LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO'];
var dia = 'todos', ruta = '';
buscarTodos();
var matriz = [];
//
function buscarTodos(){
	for(var i = 0 ; i < dias.length; i++){			
			ruta = 'horarios/'+dias[i]+'.csv';  			
    		leer(ruta);
		}		
}
//cambio de dia para cargar csv
$("#dia").change(function(){
    dia = document.getElementById("dia").value;  
    if (dia=='todos') {					
		matriz=[];
		buscarTodos();					
    }else{			
		matriz=[];			
    	ruta = 'horarios/'+dia.toUpperCase()+'.csv';
		leer(ruta);					
	}		
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
	console.log(texto)	
	var mid = document.getElementById("datos");
	var tabla ="<div data-spy='scroll' data-target='#list-example' data-offset='0 class='scrollspy-example'> <table class='table table-striped' > <thead class='thead-dark'> <tr ><th scope='col' >Día</th><th scope='col' >Hora</th><th scope='col'>Materia-Docente</th><th scope='col'>Curso</th><th scope='col'>Ubicación</th></tr></thead>";
	var array_dia= [],hora  = [], mate_doc  = [], curso  = [], lugar = [];
	for (var j = 0; j <=arreglo.length-1; j++){
		array_dia.push(arreglo[j][0]);		
		hora.push(arreglo[j][1]);
		mate_doc.push(arreglo[j][2]);
		curso.push(arreglo[j][3]);
		lugar.push(arreglo[j][4]);
	}	
	$(function (){
		$("[data-toggle='popover']")
		.popover({html:true})
	});		
	for (var i = 2; i < curso.length ; i++) {		
		if (mate_doc[i].indexOf(texto)!=-1 || curso[i].indexOf(texto)!=-1 || lugar[i].indexOf(texto)!=-1) {	
			var urlImagen = 'lugares/'+lugar[i];
			var png = ".PNG' /> ";	
			var imagen = "<img width='450px' height='450px'  src=' " +urlImagen+png;			
			var pop = '<button onclick="mostrar()" type="button" class="btn btn-dark" data-toggle="popover" data-trigger="focus" title="'+lugar[i]+'" data-content=" '+imagen+' "> '+lugar[i]+' </button>';			
			//tabla +=  "<tr><td>"+array_dia[i].toUpperCase()+" </td><td>"+hora[i]+" </td> <td>  <i> "+mate_doc[i]+"</i> </td><td>"+curso[i]+" </td><td> <a href='lugares/"+lugar[i]+".PNG'>"+lugar[i]+"</a> </td></tr>";
			tabla +=  "<tr><td>"+array_dia[i].toUpperCase()+" </td><td>"+hora[i]+" </td> <td>  <i> "+mate_doc[i]+"</i> </td><td>"+curso[i]+" </td><td>"+pop+"</td></tr>";			
		}
	}
	tabla += '</div> </table> ';
	mid.innerHTML = tabla;
}
function leer(ruta){		
	fetch(ruta)
	.then(res=> res.text())
	.then(content=> {
	let lines = content.split(/\n/);
	lines.forEach(line => matriz.push(line));
		}		
	);			
}
function recorrer(matriz){	
	var arreglo = [];	
	for (var i = 0; i <=matriz.length-2; i++) {				
		arreglo.push(matriz[i].split(","));
	}	
	return arreglo;
}
function mostrar(ruta){
	console.log(""+ruta)
}