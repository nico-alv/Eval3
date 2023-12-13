# JSON Server Example

Este es un ejemplo de cómo usar JSON Server para simular una API REST con datos JSON. En este caso, hemos creado un conjunto de datos simulados con posts, comentarios y un perfil.

## Requisitos previos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina.

## Instalación

2. Navega al directorio del proyecto.

    ```bash
    cd backend
    ```

3. Instala las dependencias.

    ```bash
    npm install
    ```

## Uso

1. Inicia JSON Server.

    ```bash
    json-server --watch posts.json --host=IP
    ```
2. Reemplazar IP con la direccion local donde json-server está escuchando.

3. JSON Server se ejecutará en `http://IP:3000`.

## Rutas disponibles

- **Posts:** `http://localhost:3000/posts`
- **Comentarios:** `http://localhost:3000/comments`

Puedes realizar solicitudes GET, POST, PUT y DELETE a estas rutas para interactuar con los datos simulados.

#### Mobile
Luego, abrir otra terminal en la raiz del proyecto y ejecutar:

```bash
cd .\mobile\
```

Instalar dependencias guardadas en package.json.

```bash
npm install
```

En App.js, cambiar 192.168.222.132 por la IP local en la que el servidor de json-server está escuchando.

```
const baseURL = 'http://192.168.222.132:8000/api/profile';
                        ^^^^^^^^^^^
```


Arrancar el proyecto mobile.

```bash
npm run android
```

----
