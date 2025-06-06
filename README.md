# 🛒 E-Commerce Express

## 🚀 Descripción

E-Commerce Express es una API RESTful construida con **Node.js** y **Express** para manejar un sistema completo de comercio electrónico.  
Permite gestionar categorías, productos, usuarios, ventas, métodos de pago y más, ideal para desarrollar un backend robusto y escalable.

---

## ⚙️ Características

- CRUD completo para productos, categorías, usuarios y ventas.
- Autenticación y autorización (opcional para próximos desarrollos).
- Rutas organizadas en módulos para mantener el código limpio y escalable.
- Uso de ES Modules para una estructura moderna y eficiente.
- Fácil integración con bases de datos como MongoDB o MySQL (en desarrollo).

---

## 📂 Estructura del proyecto  
📦 proyecto  
├── 🗃️ node_modules/  
├── 🗺️ routers/  
│   ├── 📦 categories.js  
│   ├── 🏙️ cities.js  
│   ├── 🌎 countries.js  
│   ├── 🔌 index.js  
│   ├── 💳 payment_methods.js  
│   ├── 🛒 products.js  
│   ├── 📊 sales_details.js  
│   ├── 💰 sales.js  
│   └── 👥 users.js  
├── 🔒 .env  
├── 🙈 .gitignore  
├── 🚀 app.js  
├── ⚓ package-lock.json  
└── 📜 package.json  

### 📌 Notas
- 🗃️: Dependencias  
- 🗺️: Rutas API  
- 🔒: Archivo sensible  
- 🚀: Entry point  
- 📦/🏙️/🌎: Módulos específicos (productos, ciudades, países)
  
## 🔒 Informacion de las Variables de Entorno
| Variable       | Descripción                  | Ejemplo         |
|----------------|------------------------------|-----------------|
| `PORT`         | Puerto del servidor          | `3000`          |
| `DB_HOST`      | Host de la base de datos     | `localhost`     |

## 📦 Dependencias clave
- [![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square)](): Framework web para Node.js
- [![dotenv](https://img.shields.io/badge/dotenv-16.x-ECD53F?style=flat-square)]():  Maneja variables de entorno
- [![Nodemon](https://img.shields.io/badge/Nodemon-3.x-76D04B?style=flat-square)](): Reinicia el servidor automáticamente

## 📜 Licencia [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) 

<div style="
    background: linear-gradient(90deg, #e8e8e8 100%);
    border-left: 4px solid #3498db;
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
">

Este proyecto está licenciado bajo **Apache License 2.0**.  
Para más información, consulta el archivo [LICENSE](LICENSE) o visita [apache.org/licenses](https://www.apache.org/licenses/LICENSE-2.0).
</div>

<h2>
  ✨ Elaborado por
  <img src="https://img.shields.io/badge/Juan%20David%20Gomez-black?style=for-the-badge&logo=dev.to&logoColor=white" alt="Author" style="vertical-align: middle; margin-left: 8px;">
</h2>

[![GitHub](https://img.shields.io/badge/GitHub-JuanDavidGomezN-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/juangomezn)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-JuanDavidGomezN-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/juangomezn)

[![Gmail](https://img.shields.io/badge/Gmail-juan.david%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gomezninoj681@gmail.com)
