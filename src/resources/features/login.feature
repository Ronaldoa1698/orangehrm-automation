@retoSeek
Feature: Verificar el acceso a la plataforma

    @loginSuccess
    Scenario: Verificar que el usuario puede iniciar sesión con credenciales válidas
        Given Navego a la pagina principal de orange hrm
        And Ingreso mis credenciales válidas
        When Hago clic en el botón de inicio de sesión
        Then Verifico que el usuario ha iniciado sesión correctamente
    
    @loginFailure
    Scenario Outline: Verificar que el usuario no puede iniciar sesión con credenciales inválidas
        Given Navego a la pagina principal de orange hrm
        And Ingreso las credenciales inválidas "<username>" y "<password>"
        When Hago clic en el botón de inicio de sesión
        Then Verifico que el usuario no ha podido iniciar sesión

        Examples:
            | username      | password   |
            | wrongUser1    | wrongPass1 |
            | wrongUser2    | wrongPass2 |
            | wrongUser3    | wrongPass3 |