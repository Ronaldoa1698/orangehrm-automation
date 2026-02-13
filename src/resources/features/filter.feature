@retoSeek
Feature: Filtrar usuarios por rol

    @filterUserSuccess
    Scenario: Filtrar usuarios por rol
        Given El usuario está en la página de gestión de usuarios
        When El usuario selecciona el rol "Admin" en el filtro de roles
        And Hace clic en el botón "Search"
        Then Validar que los registros contengan acciciones de editar y eliminar

    @validarAccionesEditYEliminar
    Scenario: Validar datos incorrectos y mensajes
        Given El usuario está en la página de gestión de usuarios
        When El usuario selecciona el rol "Admin" en el filtro de roles
        And Hace clic en el botón "Search"
        Then Eliminamos el rol admin
        And Validar cuando editamos un user admin
