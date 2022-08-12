$(function () {
    //console.log('jquery is working!');
    let edit = false;
    fetchUsers();

    $('#user-result').hide();

    $('#search').keyup(function (e) {
        if ($('#search').val()) {

            let search = $('#search').val();
            $.ajax({
                url: 'user-search.php',
                type: 'POST',
                data: { search },
                success: function (response) {
                    let users = JSON.parse(response, null);

                    let template = '';
                    users.forEach(user => {
                        template += `<li>
                                    ${user.name}
                                 </li>`

                    });
                    $('#container').html(template);
                    $('#user-result').show();
                    console.log(users);
                }
            })

        }

    });

    $('#user-form').submit(function (e) {
        console.log(edit);
        const postData = {
            id: $('#id').val(),
            name: $('#name').val(),
            lastName: $('#lastName').val(),
            date: $('#date').val(),
            gender: $('#gender').val()
        }
        let url = edit ===false? 'user-add.php':'user-edit.php';
  
        e.preventDefault();

        $.post(url, postData, function (response) {
            console.log(response);
            $('#user-form').trigger('reset');
            fetchUsers();
            edit=false;
        });
    });
    
    function fetchUsers() {
        $.ajax({
            url: 'user-list.php',
            type: 'GET',
            success: function (response) {
                let users = JSON.parse(response, null);
                let template = '';

                console.log(users);
                users.forEach(user => {
                    template += `
                    <tr userId="${user.id}">
                        <td>${user.id}</td>
                        <td>${user.name + " " + user.lastName} </td>
                        <td>${user.date}</td>
                        <td>${user.gender}</td>
                    
                        <td>
                            <button class= "user-delete btn btn-danger">
                               Borrar
                            </button>
                        
                    
                    
                            <button class= "user-edit btn btn-info">
                               Editar
                            </button>
                    
                            <button class= "user-view btn btn-success" >
                               ver
                            </button>
                         </td>
                    </tr>
                    `
                });
                $('#users').html(template);
            }
        });
    }

    $(document).on('click', '.user-delete', function () {
        if (confirm('¿Esta seguro que desea borrar este usuario?')) {

            const element = $(this)[0].parentElement.parentElement;
            const id = $(element).attr('userId');

            
            $.post('user-delete.php', { id }, function (response) {
                fetchUsers();
            });
        }
    });

    $(document).on('click', '.user-edit', function () {
        const element = $(this)[0].parentElement.parentElement;
       const id = $(element).attr('userId');
       $.post('user-form.php', {id}, (response) => {
        const user = JSON.parse(response,null);
        $('#name').val(user.name);
        $('#lastName').val(user.lastName);
        $('#id').val(user.id);
        $('#date').val(user.date);
        edit = true;
      });
 
    });
   
    $(document).on('click', '.user-view', function () {
        const element = $(this)[0].parentElement.parentElement;
        const id = $(element).attr('userId');


        url = 'http://localhost/prueba_desarrollador_Kevin_Tausa/Fuente/contacs.html?'+id;
        console.log(url);
        $(location).attr('href',url);
  
    });


});