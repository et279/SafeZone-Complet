<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/et279/SafeZone-Complet">
    <img src="https://raw.githubusercontent.com/et279/SafeZone-Complet/main/App/safe-zone/src/assets/Logo-Red.png" alt="Logo" width="80" height="80">
  </a>
<h3 align="center">SafeZone-Complet</h3>
  <p align="center">
    Una aplicación web para visualizar zonas restringidas de consumo de marihuana según la normativa de la Alcaldía de Envigado.
    <br />
    <a href="https://github.com/et279/SafeZone-Complet"><strong>Explora la documentación »</strong></a>
    <br />
    <br />
    <a href="https://github.com/et279/SafeZone-Complet">Ver Demo</a>
    ·
    <a href="https://github.com/et279/SafeZone-Complet/issues/new?labels=bug&template=bug-report---.md">Reportar Bug</a>
    ·
    <a href="https://github.com/et279/SafeZone-Complet/issues/new?labels=enhancement&template=feature-request---.md">Solicitar Funcionalidad</a>
  </p>
</div>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de Contenidos</summary>
  <ol>
    <li>
      <a href="#about-the-project">Sobre el Proyecto</a>
      <ul>
        <li><a href="#built-with">Construido con</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Empezando</a>
      <ul>
        <li><a href="#prerequisites">Prerequisitos</a></li>
        <li><a href="#installation">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#usage">Uso</a></li>
    <li><a href="#roadmap">Hoja de Ruta</a></li>
    <li><a href="#contributing">Contribuir</a></li>
    <li><a href="#license">Licencia</a></li>
    <li><a href="#contact">Contacto</a></li>
    <li><a href="#acknowledgments">Agradecimientos</a></li>
  </ol>
</details>
<!-- ABOUT THE PROJECT -->
Sobre el Proyecto

SafeZone-Complet es una aplicación web diseñada para proyectar un mapa interactivo con diversas capas que representan zonas y ubicaciones específicas, como hospitales, parques, colegios, y otras áreas comunes. Estas capas están basadas en los decretos de la Alcaldía de Envigado sobre el consumo regulado de sustancias, especialmente marihuana, para la protección de la infancia.


Construido con
MongoDB
Realm
Boost
Next.js
React.js
Bootstrap

<!-- GETTING STARTED -->
Empezando
Para obtener una copia local en funcionamiento, sigue estos sencillos pasos.

Prerequisitos
Debes tener instalado Node.js y npm, además de MongoDB.

Instalación
Clona el repositorio

sh
Copiar código
git clone https://github.com/et279/SafeZone-Complet.git
cd SafeZone-Complet
Instala las dependencias

sh
Copiar código
npm install
Configura la base de datos
Asegúrate de tener MongoDB instalado y en funcionamiento en tu máquina local o en un servidor accesible. Configura la conexión a MongoDB en tu archivo .env:

env
Copiar código
MONGO_URI=mongodb://localhost:27017/safezone
Configura las aplicaciones
Crea un archivo .env en la raíz del proyecto y agrega tus variables de entorno necesarias, como por ejemplo:

env
Copiar código
MAP_API_KEY=tu_api_key
Inicia la aplicación

sh
Copiar código
npm start
La aplicación estará disponible en http://localhost:3000.


<!-- USAGE EXAMPLES -->
Uso
Actualmente, la aplicación permite visualizar un mapa interactivo con capas superpuestas que representan los decretos de la alcaldía. Los usuarios pueden ver en qué zonas se puede o no consumir, así como las zonas protegidas y otros datos relevantes.


<!-- ROADMAP -->
Hoja de Ruta
 Implementación del mapa interactivo
 Integración completa de todos los decretos de la alcaldía
 Funcionalidades administrativas avanzadas
Ver issues abiertos para una lista completa de tareas propuestas (y problemas conocidos).


<!-- CONTRIBUTING -->
Contribuir
Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será muy apreciada.

Si tienes una sugerencia que mejoraría esto, por favor realiza un fork del repositorio y crea una solicitud de extracción. Puedes también simplemente abrir un issue con la etiqueta "enhancement". ¡No olvides dar una estrella al proyecto! ¡Gracias de nuevo!

Realiza un Fork del Proyecto
Crea tu Feature Branch (git checkout -b feature/AmazingFeature)
Realiza Commit de tus Cambios (git commit -m 'Add some AmazingFeature')
Realiza Push a la Rama (git push origin feature/AmazingFeature)
Abre una Pull Request

<!-- LICENSE -->
Licencia
Distribuido bajo la licencia MIT. Ver LICENSE.txt para más información.


<!-- CONTACT -->
Contacto
Tu Nombre - @et279 - fabianbeltranrojas279@gmail.com

Enlace del Proyecto: https://github.com/et279/SafeZone-Complet


<!-- ACKNOWLEDGMENTS -->
Agradecimientos
Img Shields
Choose an Open Source License
GitHub Pages
Font Awesome
React Icons


<p align="right">(<a href="#readme-top">volver arriba</a>)</p>
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/et279/SafeZone-Complet/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/et279/SafeZone-Complet.svg?style=for-the-badge
[forks-url]: https://github.com/et279/SafeZone-Complet/network/members
[stars-shield]: https://img.shields.io/github/stars/et279/SafeZone-Complet.svg?style=for-the-badge
[stars-url]: https://github.com/et279/SafeZone-Complet/stargazers
[issues-shield]: https://img.shields.io/github/issues/et279/SafeZone-Complet.svg?style=for-the-badge
[issues-url]: https://github.com/et279/SafeZone-Complet/issues
[license-shield]: https://img.shields.io/github/license/et279/SafeZone-Complet.svg?style=for-the-badge
[license-url]: https://github.com/et279/SafeZone-Complet/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/fabian-beltran-ofi/
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 