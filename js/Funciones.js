function Grafica(){
    src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"

    //var xValues = ["Bebida", "Dulceria", "Postres", "Comida preparada"];
    //var yValues = [50, 20, 40, 10, 0];
    var barColors = ["red", "green","blue","yellow"];


    (async () => {
        const respuestaRaw = await fetch("./backend/exitencias.php");
        const respuesta = await respuestaRaw.json();
        const $mychart = document.querySelector("#mychart");
        const categoria = respuesta.categoria; 
        const dat = respuesta.datos;
        const datos = array(4);
        for(i = 0; i<4; i++){
            datos[i]=dat[i].;
        }
        //const datos = respuesta.datos;
        new Chart("myChart", {
            type: "bar",
            data: {
                labels: categoria,
                datasets: [{
                backgroundColor: barColors,
                data: datos
                }]
            },
            options: {
                legend: {display: false},
                title: {
                display: true,
                text: "Productos existentes por categoria"
                }
            }
            });
    })();

   /* new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        title: {
        display: true,
        text: "Productos existentes por categoria"
        }
    }
    });*/
}
