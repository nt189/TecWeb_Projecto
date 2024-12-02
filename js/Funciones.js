function Grafica(){
    src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"

    var xValues = ["Bebida", "Dulceria", "Postres", "Comida preparada"];
    var yValues = [50, 20, 40, 10, 0];
    var barColors = ["red", "green","blue","yellow"];


    (async () => {
        const respuestaRaw = await fetch("./backend/exitencias.php");
        const respuesta = await respuestaRaw.json();
        const $mychart = document.querySelector("#mychart");
        const etiquetas = respuesta.etiquetas; 
        const datos = {
            data: respuesta.datos, 
        };
        new Chart($mychart, {
            type: 'line', // Tipo de gráfica
            data: {
                labels: etiquetas,
                datasets: [
                    datosVentas2020,
                    // Aquí más datos...
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                },
            }
        });
    })();

    new Chart("myChart", {
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
    });
}
