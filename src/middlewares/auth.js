import { auth, onAuthStateChanged } from '@/configs/firebase'; // Asegúrate de que esta ruta sea correcta

export default async function authMiddleware(req, ev) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  // Si el usuario está intentando acceder a la página de inicio de sesión,
  // no necesitamos verificar su autenticación.
  if (pathname === '/login') {
    return nextUrl;
  }

  let user = null;
  const unsubscribe = await onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user = firebaseUser;
    }
  });

  unsubscribe();

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión.
  if (!user) {
    return '/login';
  }

  // Si el usuario está autenticado, permítele acceder a la página solicitada.
  return nextUrl;
}
