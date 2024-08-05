# Guía para Desplegar una Aplicación ExpressJS con Docker y NGINX

## Paso 1: Instalar Docker en tu Servidor Linux

1. **Actualizar los paquetes del sistema:**
   ```bash
   sudo apt-get update
2. **Instalar paquetes necesarios:**
	```bash
	sudo apt-get install \
	    ca-certificates \
	    curl \
	    gnupg \
	    lsb-release
3. **Añadir la clave GPG oficial de Docker:**
	```bash
	sudo mkdir -p /etc/apt/keyrings curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
4. **Añadir el repositorio de Docker:**
	```bash
	echo \ "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
5. **Actualizar la lista de paquetes e instalar Docker:**
	```bash
	sudo apt-get update
	sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
5. **Verificar la instalación de Docker:**
	```bash
	sudo docker --version
## Paso 2: Instalar Node.js en Ubuntu
1. **Actualizar los paquetes del sistema:**
	```bash
	sudo apt-get update
1. **Instalar Node.js:**
	```bash
	sudo apt-get install -y nodejs 
	sudo apt-get install -y npm
1. **Verificar la instalación de Node.js y npm:**
	```bash
	node -v 
	npm -v
## Paso 3: Crear un Dockerfile para tu Aplicación ExpressJS
1. **Crear un archivo llamado `Dockerfile` en el directorio raíz de tu proyecto:**
	```bash
	# Usar la imagen oficial de Node.js como base
	FROM node:14

	# Crear y establecer el directorio de trabajo
	WORKDIR /usr/src/app

	# Copiar el archivo package.json y package-lock.json
	COPY package*.json ./

	# Instalar las dependencias
	RUN npm install

	# Copiar el resto de los archivos de la aplicación
	COPY . .

	# Exponer el puerto en el que corre la aplicación
	EXPOSE 3000

	# Comando para correr la aplicación
	CMD ["node", "app.js"]
## Paso 4: Construir una Imagen de Docker para tu Aplicación
1. **Construir la imagen Docker:**
	```bash
	sudo docker build -t gu-server .
## Paso 5: Ejecutar un Contenedor Docker a partir de la Imagen
1. **Ejecutar el contenedor Docker:**
	```bash
	sudo docker run -d -p 3000:3000 --name gu-container gu-server
## Paso 6: Configurar NGINX como Proxy Inverso para tu Aplicación Dockerizada
1. **Instalar NGINX:**
	```bash
	sudo apt-get update 
	sudo apt-get install nginx
2. **Configurar NGINX:**

	> Editar el archivo de configuración de NGINX

	```bash
	sudo nano /etc/nginx/sites-available/default
	```
	> Añadir la siguiente configuración:
	```bash
	server {
    listen 80;

    server_name server-gu.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}
	```
3. **Reiniciar NGINX para aplicar los cambios:**
	```bash
	sudo systemctl restart nginx
3. **Probar la configuración en postman:**
	Realizar la peticion en postman a la IP del servidor y el nombre del endpoint que queremos usar.
