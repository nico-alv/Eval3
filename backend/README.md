# JSON Server Example

Este es un ejemplo de cómo usar JSON Server para simular una API REST con datos JSON. En este caso, hemos creado un conjunto de datos simulados con posts, comentarios y un perfil.

## Requisitos previos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina.

## Instalación

1. Clona este repositorio o descarga el código.

    ```bash
    git clone https://github.com/rickyurvinaUCN/Prueba3IWM
    ```

2. Navega al directorio del proyecto.

    ```bash
    cd Prueba3IWM
    ```

3. Instala las dependencias.

    ```bash
    npm install
    ```

## Uso

1. Inicia JSON Server.

    ```bash
    json-server --watch posts.json
    ```

2. JSON Server se ejecutará en `http://localhost:3000`.

## Rutas disponibles

- **Posts:** `http://localhost:3000/posts`
- **Comentarios:** `http://localhost:3000/comments`

Puedes realizar solicitudes GET, POST, PUT y DELETE a estas rutas para interactuar con los datos simulados.

## Ejemplo de solicitud

```bash
# Obtener todos los posts
http://localhost:3000/posts

# Obtener un post específico (reemplaza {postId} con el ID del post)
http://localhost:3000/posts/{postId}

Mas documentación
https://github.com/typicode/json-server