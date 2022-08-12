$(function () {
    console.log("hola config");
    $.ajax({
        url: '../BaseDeDatos/createdb.php',
        type: 'POST',
        success: function (response) {
          console.log(response);
        }


    });



    $(document).on('click', '.dni', function () {
        let documento = window.prompt("Digite su numero de documento");
        let estado;
        //console.log(documento);
        $.ajax({
            url: 'validate.php',
            type: 'POST',
            data: { documento },
            success: function (response) {
                console.log(response);
                let users = JSON.parse(response, null);
                let template = '';
                estado = users.length;
                console.log(estado);
                if (estado == 1) {
                    url = 'http://localhost/prueba_desarrollador_Kevin_Tausa/Fuente/contacs.html?' + documento;
                    console.log(url);
                    $(location).attr('href', url);
                } else {
                    alert("Usuario No Existe");
                }
            }


        });





    });



});