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
                                <div class="card" cardId="${product.id}">
                                    <div class="image-placeholder">
                                        <img src="img/tacos3.jpeg" alt="">
                                    </div>
                                    <div class="product-info">
                                        <h2>Producto</h2>
                                        <h3>${product.name}</h3>
                                        <p><i class="fas fa-map-marker-alt"></i>${product.location}</p>
                                        <p>Categoria: ${product.category}</p>
                                        <p>Descripción: ${product.description}</p>
                                        <p class="price2">$ ${product.priceSale}</p>
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
