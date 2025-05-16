## Esquema de la API

### Eventos

```typescript
// GET /api/events
// Obtener todos los eventos
Response: {
  events: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

// GET /api/events/:id
// Obtener un evento específico
Response: {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// POST /api/events
// Crear un nuevo evento
Request: {
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}
Response: {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// PUT /api/events/:id
// Actualizar un evento existente
Request: {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  imageUrl?: string;
}
Response: {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// DELETE /api/events/:id
// Eliminar un evento
Response: {
  success: boolean;
  message: string;
}
```

### Autenticación

```typescript
// POST /api/auth/register
// Registrar un nuevo usuario
Request: {
  email: string
  password: string
  name: string
}
Response: {
  user: {
    id: string
    email: string
    name: string
  }
  token: string
}

// POST /api/auth/login
// Iniciar sesión
Request: {
  email: string
  password: string
}
Response: {
  user: {
    id: string
    email: string
    name: string
  }
  token: string
}

// GET /api/auth/me
// Obtener información del usuario actual
Response: {
  id: string
  email: string
  name: string
}
```

### Respuestas de Error

```typescript
// Formato estándar de error
Response: {
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```
