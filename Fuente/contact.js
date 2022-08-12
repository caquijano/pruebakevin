$(function () {
    //console.log('jquery is working!');
    let PAT = (window.location.search).slice(1);
    let edit = false;
    //console.log(PAT);
    fetchContacts();

    $('#contact-form').submit(function (e) {
        const postData = {
            //id: $('#contact-id').val(),
            contact_name: $('#contact-name').val(),
            contact_number: $('#contact-number').val(),
            contact_type: $('#contac-type').val(),
            contact_relationship: $('#contac-relationship').val(),
            user_id: PAT,
        }
        let url = edit === false ? 'contact-add.php' : 'contact-edit.php';

        e.preventDefault();
        $.post(url, postData, function (response) {
            $('#contact-form').trigger('reset');
            fetchContacts();
            edit = false;
            // console.log(response);
        });
    });



    function fetchContacts() {
        $.ajax({

            url: 'contact-list.php',
            type: 'POST',
            data: { PAT },
            success: function (response) {


                let contacts = JSON.parse(response, null);
                let template = '';
                //console.log(contacts);
                contacts.forEach(contact => {
                    template += `
                <tr userId="${contact.contact_number}">
                <td>${contact.contact_name}</td>
                    <td>${contact.contact_number}</td>
                    <td>${contact.contact_type}</td>
                    <td>${contact.contact_relationship}</td>
                    <td>
                    <button class= "contact-delete btn btn-danger">
                       Borrar
                    </button>
                
            
            
                    <button class= "contact-edit btn btn-info">
                       Editar
                    </button>
            
                   
                 </td>


                </tr>
                `
                });
                $('#contact').html(template);


            }
        });
    }
    $(document).on('click', '.contact-delete', function () {
        if (confirm('¿Esta seguro que desea borrar este contact?')) {
            const element = $(this)[0].parentElement.parentElement;
            const id = $(element).attr('userId');

            console.log(id);
            $.post('contact-delete.php', { id }, function (response) {

                console.log(response);         
                 fetchContacts();
            });
        }
    });

    $(document).on('click', '.contact-edit', function () {
        const element = $(this)[0].parentElement.parentElement;
       const id = $(element).attr('userId');
       $.post('contact-form.php', {id}, (response) => {
        console.log(response);
        
        const contac = JSON.parse(response,null);
        $('#contact-name').val(contac.contact_name);
        $('#contact-number').val(contac.contact_number);
        $('#contac-type').val(contac.contact_type);
        $('#contac-relationship').val(contac.contact_relationship);
        edit = true;
      });
 
    });




});