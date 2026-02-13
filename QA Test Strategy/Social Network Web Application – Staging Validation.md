# 🚀 Social Network Web Application -- Staging Validation

  Campo             Valor
  ----------------- ----------------------------
  QA Engineer       Ronaldo Andre Delgado Jara
  Versión           1.0
  Ambiente          Public Staging
  Release Target    v1.0 Production
  Tipo de pruebas   Funcionales Manuales

------------------------------------------------------------------------

# 📌 Executive Summary

Este documento define los casos de prueba funcionales manuales para
validar las funcionalidades clave de la red social antes de su
liberación a producción.

Funcionalidades evaluadas: - Registro de usuario - Inicio de sesión -
Subida de imágenes - Comentarios - Chat privado

------------------------------------------------------------------------

# 🧪 Casos de Prueba Funcionales Manuales

## 🔹 TC-REG-01 --- Registro exitoso con datos válidos

``` bash
Funcionalidad : Registro
Tipo          : Positivo
Prioridad     : Alta
ID            : TC-REG-01
```

Objetivo: Verificar que un usuario pueda registrarse correctamente con
datos válidos.

Precondiciones: - El correo no debe existir en el sistema. - Acceso a la
pantalla de registro.

Datos de prueba:

``` bash
Nombre   : Test User
Email    : testuser+001@mail.com
Password : P@ssw0rd!2026
```

Pasos: 1. Ingresar a la página de registro. 2. Completar nombre, email y
password. 3. Aceptar términos (si aplica). 4. Clic en Registrarse.

Resultado esperado: - Usuario creado exitosamente. - Mensaje de
confirmación visible. - Redirección a Home/Feed o Login.

------------------------------------------------------------------------

## 🔹 TC-LOG-01 --- Inicio de sesión exitoso

``` bash
Funcionalidad : Login
Tipo          : Positivo
Prioridad     : Crítica
ID            : TC-LOG-01
```

Objetivo: Validar que un usuario registrado pueda iniciar sesión
correctamente.

Precondiciones: - Usuario existente y activo.

Datos de prueba:

``` bash
Email    : testuser+001@mail.com
Password : P@ssw0rd!2026
```

Pasos: 1. Ir a la página de login. 2. Ingresar credenciales válidas. 3.
Clic en Iniciar sesión.

Resultado esperado: - Inicio de sesión exitoso. - Redirección al
Feed/Dashboard. - Sesión activa creada.

------------------------------------------------------------------------

## 🔹 TC-UP-01 --- Subida de imagen válida

``` bash
Funcionalidad : Subida de imágenes
Tipo          : Positivo
Prioridad     : Alta
ID            : TC-UP-01
```

Objetivo: Verificar que un usuario autenticado pueda subir una imagen
válida.

Precondiciones: - Usuario autenticado. - Acceso a Nueva publicación.

Datos de prueba:

``` bash
Archivo      : foto_valida.jpg (<5MB)
Descripción  : Mi primera publicación
```

Pasos: 1. Iniciar sesión. 2. Ir a Crear publicación. 3. Seleccionar
imagen. 4. Agregar descripción. 5. Publicar.

Resultado esperado: - Imagen visible en feed. - Publicación asociada al
usuario correcto.

------------------------------------------------------------------------

## 🔹 TC-COM-01 --- Crear comentario válido

``` bash
Funcionalidad : Comentarios
Tipo          : Positivo
Prioridad     : Alta
ID            : TC-COM-01
```

Objetivo: Validar que un usuario pueda comentar una publicación.

Precondiciones: - Usuario autenticado. - Existe al menos una
publicación.

Datos de prueba:

``` bash
Comentario : Excelente foto 👏
```

Pasos: 1. Iniciar sesión. 2. Escribir comentario. 3. Enviar.

Resultado esperado: - Comentario visible inmediatamente. - Asociado al
usuario correcto.

------------------------------------------------------------------------

## 🔹 TC-CHAT-01 --- Enviar mensaje privado

``` bash
Funcionalidad : Chat Privado
Tipo          : Positivo
Prioridad     : Crítica
ID            : TC-CHAT-01
```

Objetivo: Verificar que un usuario pueda enviar un mensaje privado
correctamente.

Precondiciones: - Usuario A autenticado. - Usuario B existente.

Datos de prueba:

``` bash
Mensaje : Hola, ¿cómo estás?
```

Pasos: 1. Iniciar sesión como Usuario A. 2. Abrir chat. 3. Enviar
mensaje.

Resultado esperado: - Mensaje visible en conversación. - Persistencia
tras refresh.

------------------------------------------------------------------------

# 📌 Requisitos Funcionales

## RQ-01 --- Registro de Usuario

El sistema debe permitir crear una cuenta con email único y contraseña
válida.

## RQ-02 --- Inicio de Sesión

El sistema debe permitir autenticación con credenciales válidas y crear
sesión activa.

## RQ-03 --- Publicación de Imágenes

Usuarios autenticados pueden subir imágenes en formatos permitidos.

## RQ-04 --- Comentarios

Usuarios autenticados pueden comentar publicaciones existentes.

## RQ-05 --- Mensajería Privada

Usuarios autenticados pueden enviar y recibir mensajes privados.

------------------------------------------------------------------------

# 📈 Cobertura
``` bash
  Métrica                Valor
  ---------------------- -------
  Requisitos definidos   5
  Requisitos cubiertos   5
  Cobertura funcional    100%
```
------------------------------------------------------------------------
