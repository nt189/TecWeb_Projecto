/*------------------------Enviar Formulario----------------------*/


    $(document).ready(function(){
        $('#product-form').submit(function(e){
            e.preventDefault();
            
            let nombre = $('#nombre').val().trim();
            let categoria = $('#categoria').val().trim();
            let precioOriginal = $('#precioOrg').val().trim();
            let precioFinal = $('#precio').val().trim();
            let detalles = $('#detalles').val().trim();
            let unidades = $('#unidades').val().trim();
            let imagen = $('#imagen').val();
            let idSesion = 1;

            //-------------VALIDACIONES-------------
            
            
            //----------------------------------------/
            // Verificar si están vacíos y asignar un valor por defecto
            if (nombre === ''){nombre = 'Sin nombre';} 
            if (categoria === '') {categoria = 'General';}
            if (precioOriginal === '') {precioOriginal = '0.00';}
            if (precioFinal === '') {precioFinal = '0.00';}
            if (detalles === '') {detalles = 'Sin detalles';}
            if (unidades === '') {unidades = '0';}
            if (imagen === '') {imagen = 'default.jpg'; } 

            
            const datosFormulario = {
                'nombre': nombre,
                'categoria': categoria,
                'cantidad': unidades,
                'precioOri': precioOriginal,
                'precioFin': precioFinal,
                'detalles': detalles,
                'imagen': imagen,
                'user_id': idSesion
            };   
        
            let postData = JSON.stringify(datosFormulario);

            $.ajax({
                url: 'products-add.php',
                type: 'POST',
                data: postData,
                success: function(respuesta){
                    console.log(respuesta);
                    try{
                        const resultado = JSON.parse(respuesta);
                        if(resultado.status === 'success'){
                            console.log('Producto agregado exitosamente', resultado.message);
                            $('#product-form')[0].reset();
                        } else{
                            console.log('Erro al agregar producto:', resultado.message);
                        }
                    }
                    catch{
                        console.error('Error al procesar la respuesta:',  error);
                    }
                }
            });

/*
            $.post('./backend/products-add.php', postData ,(response) => {
                console.log(response);
                
                //let respuesta = JSON.parse(response);
                //try{
                //    const resultado = JSON.parse(respuesta);
                //    if(resultado.status === 'success'){
                //        console.log('Producto agregado exitosamente', resultado.message);
                //        $('#product-form')[0].reset();
                //    } else{
                //        console.log('Erro al agregar producto:', resultado.message);
                //    }
                //}
                //catch{
                //    console.error('Error al procesar la respuesta:',  error);
                //}
            });
*/
        });
    });

