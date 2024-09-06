# TravelExperience

El componente `TravelExperience` muestra una experiencia de viaje utilizando carruseles de imágenes y videos. Dependiendo del tamaño de la pantalla (móvil o de escritorio), se presentan diferentes disposiciones para los carruseles.

## Props

- **`title`** (string): El título de la sección del carrusel.
- **`subtitle`** (string): El subtítulo de la sección del carrusel.
- **`dataVideoPhone`** (TravelExperienceData[]): Un arreglo de objetos que contiene los datos de los videos.
- **`dataImageCarrousel`** (TravelExperienceData[]): Un arreglo de objetos que contiene los datos de las imágenes para el carrusel.

## Descripción

- **Vista móvil**: Muestra un carrusel de imágenes y un carrusel de videos uno al lado del otro.
- **Vista de escritorio**: Muestra un carrusel de videos y un carrusel de imágenes en una disposición vertical, con el título y subtítulo arriba del carrusel de imágenes.

## Funcionalidades

- **`handleVideoEnd`**: Función que avanza al siguiente slide cuando un video termina.
- **`handleImageChanged`**: Función que avanza al siguiente slide de la imagen cuando cambia el slide del video.

## Componentes Importados

- **`TravelExperienceTitleSection`**: Muestra el título y el subtítulo de la experiencia de viaje.
- **`TravelExperienceVideoCarousel`**: Muestra un carrusel de videos.
- **`TravelExperienceImageCarousel`**: Muestra un carrusel de imágenes para vistas de escritorio.
- **`TravelExperienceImageIsMobileCarousel`**: Muestra un carrusel de imágenes para vistas móviles.

## Componentes necesarios

- Configurar el `ThemeProvider` con los breakpoints en la raíz de la aplicación.

## Ejemplo de uso

```tsx
// Lista de videos
const dataVideoPhone = [
  { id: "1", url: "https://res.cloudinary.com/dvyv1ldjg/video/upload/f_auto:video,q_auto/v1/video/o16nvv9m3fmhghzhkxy5" },
  { id: "2", url: "https://res.cloudinary.com/dvyv1ldjg/video/upload/f_auto:video,q_auto/v1/video/evm0lfvvrpt44aejzml6" },
  { id: "3", url: "https://res.cloudinary.com/dvyv1ldjg/video/upload/f_auto:video,q_auto/v1/video/pkcydnpesslfupasotja" },
  { id: "4", url: "https://res.cloudinary.com/dvyv1ldjg/video/upload/f_auto:video,q_auto/v1/video/pz6f3kcqbyn1xywr0jhs" },
  { id: "5", url: "https://res.cloudinary.com/dvyv1ldjg/video/upload/f_auto:video,q_auto/v1/video/o16nvv9m3fmhghzhkxy5" },
  { id: "6", url: "https://res.cloudinary.com/dvyv1ldjg/video/upload/f_auto:video,q_auto/v1/video/evm0lfvvrpt44aejzml6" },
  { id: "7", url: "https://res.cloudinary.com/dvyv1ldjg/video/upload/f_auto:video,q_auto/v1/video/pkcydnpesslfupasotja" },
  { id: "8", url: "https://res.cloudinary.com/dvyv1ldjg/video/upload/f_auto:video,q_auto/v1/video/pz6f3kcqbyn1xywr0jhs" },
];

// Lista de imágenes previas del video. La última debe ser la imagen previa del primer video
const dataImageCarrousel = [
  { id: "2", url: "https://res.cloudinary.com/dvyv1ldjg/image/upload/f_auto,q_auto/v1/video/qotbvr6ci2ixgxcwbzjf" },
  { id: "3", url: "https://res.cloudinary.com/dvyv1ldjg/image/upload/f_auto,q_auto/v1/video/gggsabkuxohyydchr9qm" },
  { id: "4", url: "https://res.cloudinary.com/dvyv1ldjg/image/upload/f_auto,q_auto/v1/video/y7cc146orfpdb5q8lyc4" },
  { id: "5", url: "https://res.cloudinary.com/dvyv1ldjg/image/upload/f_auto,q_auto/v1/video/evsis0mcfcwedqdlp9tv" },
  { id: "6", url: "https://res.cloudinary.com/dvyv1ldjg/image/upload/f_auto,q_auto/v1/video/qotbvr6ci2ixgxcwbzjf" },
  { id: "7", url: "https://res.cloudinary.com/dvyv1ldjg/image/upload/f_auto,q_auto/v1/video/gggsabkuxohyydchr9qm" },
  { id: "8", url: "https://res.cloudinary.com/dvyv1ldjg/image/upload/f_auto,q_auto/v1/video/y7cc146orfpdb5q8lyc4" },
  { id: "1", url: "https://res.cloudinary.com/dvyv1ldjg/image/upload/f_auto,q_auto/v1/video/evsis0mcfcwedqdlp9tv" },
];

<TravelExperience
  title="Un Viaje Inolvidable"
  subtitle="Descubre nuevas aventuras en lugares exóticos"
  dataVideoPhone={dataVideoPhone}
  dataImageCarrousel={dataImageCarrousel}
/>
´´´
