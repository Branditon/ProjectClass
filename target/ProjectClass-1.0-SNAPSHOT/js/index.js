/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
$(document).ready(function()
{
    function fetchUsers() 
    {
        $.ajax({
            type: "GET",
            url: "UserService",
            success: function (response) 
            {
                if ($.fn.DataTable.isDataTable("#userTable")) 
                {
                    let table = $("#userTable").DataTable();
                    table.clear();

                    response.forEach((user, index) => {
                        table.row.add([
                            index + 1,
                            user.numDoc,
                            user.name,
                            user.lastName,
                            user.phone,
                            `<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                            <a class="add-edit" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" data-id="`+ user.id +`"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" data-id="`+ user.id +`"><i class="material-icons">&#xE872;</i></a>`
                        ]);
                    });

                    table.draw();
                } 
                else 
                {
                    $("#userTable").DataTable({
                        data: response.map((user, index) => [
                            index + 1,
                            user.numDoc,
                            user.name,
                            user.lastName,
                            user.phone,
                            `<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                            <a class="add-edit" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip" data-id="`+ user.id +`"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip" data-id="`+ user.id +`"><i class="material-icons">&#xE872;</i></a>`
                        ]),
                        pageLength: 5,
                        lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
                        language: {
                            lengthMenu: "Mostrar _MENU_ registros por página",
                            zeroRecords: "No se encontraron registros",
                            info: "Mostrando página _PAGE_ de _PAGES_",
                            infoEmpty: "No hay registros disponibles",
                            infoFiltered: "(filtrado de _MAX_ registros totales)",
                            search: "Buscar:",
                            paginate: {
                                first: "Primero",
                                last: "Último",
                                next: "Siguiente",
                                previous: "Anterior"
                            }
                        }
                    });
                }
            },
            error: function () {
                alert("Error al cargar los datos.");
            }
        });
    }
    
    fetchUsers();

	// Append table with add row form on add new button click
    $(".add-new").click(function()
    {
        $(this).attr("disabled", "disabled");
        var index = $("table tbody tr:last-child").index();
        
        var row = '<tr>' +
            '<td>-</td>' +
            '<td><input type="text" class="form-control" name="numDocument" id="name"></td>' +
            '<td><input type="text" class="form-control" name="name" id="department"></td>' +
            '<td><input type="text" class="form-control" name="lastName" id="phone"></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
            '<td>' +
                '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>' +
                '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>' +
            '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
    
    // Add row on add button click
    $(document).on("click", ".add", function () 
    {
        var row, numDocument, name, lastName, phone;

        row = $(this).closest("tr");
        numDocument = row.find("input[name='numDocument']").val();
        name = row.find("input[name='name']").val();
        lastName = row.find("input[name='lastName']").val();
        phone = row.find("input[name='phone']").val();
        
        if (!numDocument || !name || !lastName || !phone) 
        {
            alert("Todos los campos son obligatorios.");
            return;
        }
        
        $.ajax({
            type: "POST",
            url: "UserService",
            data: {
                action: "create",
                numDocument: numDocument,
                name: name,
                lastName: lastName,
                phone: phone
            },
            success: function (response) {
                setTimeout(fetchUsers, 500);
                $(".add-new").removeAttr("disabled");
            },
            error: function () {
                alert("Error al guardar en la base de datos.");
            }
        });
    });
    
    $(document).on("click", ".add-edit", function () 
    {
        var row, numDocument, name, lastName, phone, id;
        

        row = $(this).closest("tr");
        numDocument = row.find("input[name='numDocument']").val();
        name = row.find("input[name='name']").val();
        lastName = row.find("input[name='lastName']").val();
        phone = row.find("input[name='phone']").val();
        id = row.find("input[name='id']").val();
             
        if (!numDocument || !name || !lastName || !phone) 
        {
            alert("Todos los campos son obligatorios.");
            return;
        }
        
        $.ajax({
            type: "POST",
            url: "UserService",
            data: {
                action: "update",
                id: id,
                numDocument: numDocument,
                name: name,
                lastName: lastName,
                phone: phone
            },
            success: function (response) {
                setTimeout(fetchUsers, 500);
                $(".add-new").removeAttr("disabled");
            },
            error: function () {
                alert("Error al guardar en la base de datos.");
            }
        });
    });
    
    // Edit row on edit button click
    $(document).on("click", ".edit", function()
    {		
        var row, id;
        
        
        row = $(this).closest("tr");
        id = $(this).attr("data-id");
        
        $(this).parents("tr").find("td:not(:last-child)").each(function(index)
        {
            var columnNames = ["numDocument", "name", "lastName", "phone"];
            
            if (index === 0) 
            {  
                $(this).html('<input type="text" class="user-id" name="id" value="'+ id +'" display="none">');
                return;
            }
            
            $(this).html('<input type="text" class="form-control" name="'+ columnNames[index - 1] +'" value="' + $(this).text() + '">');
        });
        
        row.find(".edit").hide();
        row.find(".delete").hide();
        row.find(".add-edit").show();
        $(".add-new").attr("disabled", "disabled");
    });
    
    // Delete row on delete button click
    $(document).on("click", ".delete", function()
    {
        var id = $(this).attr("data-id");

        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) 
        {
            $.ajax({
                type: "POST",
                url: "UserService",
                data: {
                    action: "delete",
                    id: id
                },
                success: function(response) {
                    setTimeout(fetchUsers, 500);
                    alert("Usuario eliminado correctamente.");
                },
                error: function() {
                    alert("Error al eliminar el usuario.");
                }
            });
        }
    });
});

