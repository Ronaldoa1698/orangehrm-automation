@retoOka
Feature: Edicion de Usuario Existente

    @addUserAdmin
    Scenario: Agregar un empleado admin
        Given El usuario está en la página de gestión de usuarios PIM
        When El usuario hace clic en el botón para agregar un empleado
        And El usuario completa el formulario con datos válidos para un empleado
        And Hace clic en el botón "Save"
        Then Vamos a la pagina de admin y buscamos el user creado
        And Al empleado encontrado le asignamos un rol de admin
    
    @emptyFields
    Scenario: Validar campos obligatorios en formulario de usuario
        Given El usuario está en la página de agregar usuario admin
        When El usuario intenta guardar el formulario sin completar los campos obligatorios
        Then Se muestran mensajes de error para todos los campos requeridos
