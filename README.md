# Facial Recognition Login App 👋

Este es un proyecto de [Expo](https://expo.dev) creado con [`create-expo-app`](https://www.npmjs.com/package/create-expo-app), que implementa inicio de sesión mediante **reconocimiento facial** con animaciones interactivas y efectos visuales.

## Características

- Inicio de sesión mediante usuario y contraseña.
- Escaneo facial simulado para autenticación automática.
- Animaciones de interfaz:

  - Círculo de escaneo que pulsa y brilla.
  - Texto parpadeante durante el escaneo.
  - Botón “respirando” al estilo animado.

- Gestión de permisos de cámara con [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/).

## Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Inicia la aplicación:

```bash
npx expo start
```

3. Opcion de ejecución:

- [Expo Go](https://expo.dev/go)

## Uso

1. Abre la app y concede permiso para acceder a la cámara.
2. Ingresa tu usuario y contraseña.
3. Presiona **Iniciar sesión** para activar el escaneo facial.
4. Observa las animaciones mientras se simula la autenticación facial.
5. Una vez completado, serás redirigido a la pantalla de bienvenida.

## Estructura del proyecto

- `App.js` – Archivo principal con la lógica de UI y animaciones.
- `styles` – Estilos usando `StyleSheet` de React Native.
- `CameraView` y `useCameraPermissions` – Integración de la cámara frontal para escaneo.

## Recursos útiles

- [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)
- [React Native Animations](https://reactnative.dev/docs/animations)
- [Expo Docs](https://docs.expo.dev/)
- [Expo Go](https://expo.dev/go)
