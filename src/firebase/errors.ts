export const storageError: { [key: string]: string } = {
  "storage/unknown": "Ocurrió un error desconocido.",
  "storage/object-not-found": "No se encontró el archivo que estás buscando.",
  "storage/bucket-not-found":
    "No se configuró ningún bucket para Cloud Storage.",
  "storage/project-not-found":
    "No se configuró ningún proyecto para Cloud Storage.",
  "storage/quota-exceeded":
    "Se superó la cuota del bucket de Cloud Storage. Por favor, actualiza a un plan pagado o comunícate con el soporte de Firebase si ya estás en un plan pagado.",
  "storage/unauthenticated":
    "Debes autenticarte antes de realizar esta acción.",
  "storage/unauthorized":
    "No estás autorizado para realizar la acción deseada. Verifica las reglas de seguridad.",
  "storage/retry-limit-exceeded":
    "Se superó el límite de tiempo máximo permitido para la operación. Por favor, inténtalo de nuevo.",
  "storage/invalid-checksum":
    "El archivo que intentas subir no coincide con la suma de verificación del servidor. Vuelve a intentarlo.",
  "storage/canceled": "La operación fue cancelada por el usuario.",
  "storage/invalid-event-name":
    "Nombre de evento no válido. Debe ser uno de los siguientes: `running`, `progress` o `pause`.",
  "storage/invalid-url":
    "La URL proporcionada no es válida. Utiliza el formato gs://bucket/object o https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=&ltTOKEN>",
  "storage/invalid-argument":
    "Argumento no válido. Debes pasar un arreglo de tipo `File`, `Blob` o `UInt8` a put(). Para putString(), debes proporcionar una cadena en formato `Base64` o `Base64URL`.",
  "storage/no-default-bucket":
    "No se estableció ningún bucket en la propiedad storageBucket de tu configuración.",
  "storage/cannot-slice-blob":
    "Error al intentar manipular el archivo local. Verifica que el archivo no haya cambiado y vuelve a subirlo.",
  "storage/server-file-wrong-size":
    "El archivo del cliente no coincide con el tamaño del archivo que recibió el servidor. Vuelve a subirlo.",
};

export const authError: { [key: string]: string } = {
  "auth/claims-too-large":
    "La información proporcionada supera el tamaño máximo permitido.",
  "auth/email-already-exists":
    "El correo electrónico ya está en uso por otro usuario. Cada usuario debe tener un correo electrónico único.",
  "auth/id-token-expired": "La sesión ha expirado, vuelve a iniciar sesión.",
  "auth/id-token-revoked": "La sesión ha sido revocada.",
  "auth/insufficient-permission":
    "No tienes permisos suficientes para realizar esta acción. Verifica la configuración de tu proyecto en Firebase console.",
  "auth/internal-error":
    "Se ha producido un error inesperado. Por favor, inténtalo de nuevo. Si el problema persiste, contacta al soporte técnico.",
  "auth/invalid-argument":
    "El valor proporcionado no es válido. Por favor, verifica la información ingresada.",
  "auth/invalid-claims":
    "La información personalizada proporcionada no es válida.",
  "auth/invalid-continue-uri":
    "La URL de continuación proporcionada no es válida.",
  "auth/invalid-creation-time":
    "La hora de creación proporcionada no es válida.",
  "auth/invalid-credential": "El correo o la contraseña son incorrectos.",
  "auth/invalid-login-credentials": "Las credenciales son incorrectas",
  "auth/invalid-disabled-field":
    "El valor proporcionado para la propiedad 'disabled' del usuario no es válido. Debe ser un booleano.",
  "auth/invalid-display-name":
    "El valor proporcionado para la propiedad 'displayName' del usuario no es válido. Debe ser una cadena no vacía.",
  "auth/invalid-dynamic-link-domain":
    "El dominio de enlace dinámico proporcionado no está configurado o no está autorizado para el proyecto actual.",
  "auth/invalid-email":
    "El correo electrónico proporcionado no es válido. Debe ser una dirección de correo electrónico válida.",
  "auth/invalid-email-verified":
    "El valor proporcionado para la propiedad 'emailVerified' del usuario no es válido. Debe ser un booleano.",
  "auth/invalid-hash-algorithm": "El algoritmo de hash no es válido.",
  "auth/invalid-hash-block-size": "El tamaño del bloque de hash no es válido.",
  "auth/invalid-hash-derived-key-length":
    "La longitud de la clave derivada de hash no es válida.",
  "auth/invalid-hash-key": "La clave de hash no es válida.",
  "auth/invalid-hash-memory-cost":
    "El costo de la memoria de hash no es válido.",
  "auth/invalid-hash-parallelization":
    "La paralelización de hash no es válida.",
  "auth/invalid-hash-rounds": "Las rondas de hash no son válidas.",
  "auth/invalid-hash-salt-separator":
    "El campo de separador de sal del algoritmo de hash no es válido.",
  "auth/invalid-id-token":
    "El token de ID proporcionado no es un token de ID de Firebase válido.",
  "auth/invalid-last-sign-in-time": "La hora del último acceso no es válida.",
  "auth/invalid-page-token":
    "El token de página siguiente proporcionado no es válido.",
  "auth/invalid-password":
    "La contraseña proporcionada no es válida. Debe tener al menos seis caracteres.",
  "auth/invalid-password-hash": "El hash de la contraseña no es válido.",
  "auth/invalid-password-salt": "La contraseña con sal no es válida.",
  "auth/invalid-phone-number":
    "El número de teléfono proporcionado no es válido. Debe cumplir con el estándar E.164.",
  "auth/invalid-photo-url": "La URL de la foto del usuario no es válida.",
  "auth/invalid-provider-data": "Los datos del proveedor no son válidos.",
  "auth/invalid-provider-id": "El ID del proveedor no es válido.",
  "auth/invalid-oauth-responsetype":
    "Solo se debe configurar un responseType de OAuth como verdadero.",
  "auth/invalid-session-cookie-duration":
    "La duración de la cookie de sesión no es válida. Debe estar entre 5 minutos y 2 semanas.",
  "auth/invalid-uid":
    "El UID proporcionado no es válido. Debe ser una cadena no vacía con un máximo de 128 caracteres.",
  "auth/invalid-user-import":
    "El registro de usuarios para importar no es válido.",
  "auth/maximum-user-count-exceeded":
    "Se ha superado la cantidad máxima de usuarios permitidos para importar.",
  "auth/missing-android-pkg-name":
    "Es obligatorio proporcionar el nombre de paquete de Android si es necesario instalar la aplicación en dispositivos Android.",
  "auth/missing-continue-uri":
    "Debes proporcionar una URL de continuación válida.",
  "auth/missing-hash-algorithm":
    "Para importar usuarios con hash de contraseñas, es necesario proporcionar el algoritmo de hash y sus parámetros.",
  "auth/missing-ios-bundle-id": "Falta el ID del paquete en la solicitud.",
  "auth/missing-uid":
    "Se requiere un identificador UID para la operación actual.",
  "auth/missing-oauth-client-secret":
    "El secreto de cliente de la configuración de OAuth es obligatorio para habilitar el flujo de código de OIDC.",
  "auth/operation-not-allowed":
    "La operación no está permitida. Verifica la configuración de tu proyecto en Firebase console.",
  "auth/phone-number-already-exists":
    "El número de teléfono ya está en uso por otro usuario. Cada usuario debe tener un número de teléfono único.",
  "auth/project-not-found":
    "No se encontró ningún proyecto de Firebase para la credencial utilizada. Verifica la configuración de tu proyecto.",
  "auth/reserved-claims":
    "Una o más reclamaciones personalizadas de usuarios están reservadas y no pueden ser utilizadas.",
  "auth/session-cookie-expired":
    "La cookie de sesión ha vencido. Vuelve a iniciar sesión.",
  "auth/session-cookie-revoked":
    "Se han revocado las cookies de la sesión de Firebase.",
  "auth/too-many-requests":
    "Se ha excedido la cantidad máxima de solicitudes permitidas. Inténtalo de nuevo más tarde.",
  "auth/uid-already-exists":
    "El identificador UID ya está en uso por otro usuario. Cada usuario debe tener un UID único.",
  "auth/unauthorized-continue-uri":
    "El dominio de la URL de continuación no está autorizado. Añádelo a la lista blanca en Firebase console.",
  "auth/user-not-found":
    "No se encontró ningún usuario con la información proporcionada.",
  "auth/wrong-password": "Usuario o contraseña incorrectos",
  "auth/popup-closed-by-user":
    "La ventana emergente fue cerrada por el usuario antes de finalizar la operación.",
  "auth/invalid-action-code":
    "El código de acción no es válido. Esto puede deberse a que el código ha caducado.",
  "": "Hubo un error. Contacta con soporte",
};

export const customErrors: { [key: string]: string } = {
  "role/not-found":
    "No tienes un rol asignado, contacta con el administrador si crees que es un error.",
  "user/not-found":
    "No se encontró un usuario con la información proporcionada.",
  "auth/account-exists-with-different-credential":
    "Ya existe una cuenta con el mismo correo electrónico. Intenta iniciar sesión con tu correo y contraseña o contacta con soporte.",
  "auth/email-already-in-use":
    "El correo electrónico ya está en uso por otro usuario.",
};

export const firebaseError = {
  ...storageError,
  ...authError,
  ...customErrors,
};
