$(document).ready(function () {
    $('#search-input').keyup(function () {
        const search = $('#search-input').val();
        
        // Validación para evitar búsquedas vacías
        if ((search.trim()) === '') {
            return;
        }

        $.ajax({
            url: './backend/search.php?search=' + encodeURIComponent(search),
            type: 'GET',
            success: function (response) {
                console.log("Search");
                console.log(response);
                
                if (!response.error) {
                    // Convertir a objeto JSON
                    const products = JSON.parse(response);
                    
                    // Verificar si hay datos
                    if (Object.keys(products).length > 0) {
                        let template = '';
                        
                        products.forEach(product => {
                            template += `
                                <div class="card" cardId="${product.producto_id}">
                                    <div class="image-placeholder">
                                        <img src="img/tacos3.jpeg" alt="">
                                    </div>
                                    <div class="product-info">
                                        <h2>Producto</h2>
                                        <h3>${product.producto_nombre}</h3>
                                        <p><i class="fas fa-map-marker-alt"></i> ${product.user_ubicacion}</p>
                                        <p>Categoria: ${product.producto_categoria}</p>
                                        <p>Descripción: ${product.producto_detalles}</p>
                                        <p class="price2">$ ${product.producto_precio}</p>
                                    </div>
                                </div>
                            `;
                        });

                        $('#products').html(template);
                    } else {
                        $('#products').html('<p>No se encontraron productos.</p>');
                    }
                }
            }
        });
    });
});
