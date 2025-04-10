alert("Bienvenido a Campulands");
let opcion = prompt("Selecciona una opción (1.Camper.  2.Trainer.   3.Coordinador):");


if (opcion == 1){
  alert("Has iniciado como Camper. ");
  camper = true;
}
else if(opcion == 2){
  alert("Has inic iado como Trainer. ");
  trainer = true;
}
else if(opcion == 3){
  alert("Has iniciado como Coordinador. ");
  coordinador = true;
}
else{
  alert("Opción no válida");
}

if (camper){
  alert("1. Ver Notas")

  let opcCampers = prompt("Ingrese la opción que necesite: ")
  var Notas = {
    introPro: "",
    git: "",
    scrum: "",
    python: "",
    javascript: "",
  }
  if (opcCampers == "1"){
    alert("Sus notas son", Notas)
  }
  
}

if (coordinador){
  
}