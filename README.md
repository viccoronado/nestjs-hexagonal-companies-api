# NestJS Hexagonal Companies API

## Descripción

API RESTful desarrollada con **NestJS** para la gestión de empresas y sus transferencias, siguiendo principios de **Clean Architecture** y **Arquitectura Hexagonal**. Permite registrar empresas (Pyme o Corporativa), consultar empresas que realizaron transferencias en el último mes y empresas que se adhirieron recientemente.

---

## Decisiones técnicas

- **NestJS**: Framework robusto y modular para Node.js.
- **Arquitectura Hexagonal**: Separación clara entre dominio, aplicación e infraestructura para facilitar mantenibilidad y testeo.
- **Persistencia en memoria**: Para simplicidad y facilidad de pruebas locales.
- **Swagger**: Documentación automática y visual de la API.
- **Validación y manejo de errores**: Uso de `class-validator` y filtros globales.
- **Testing**: Incluye unit tests, e2e tests y performance tests (con k6).

---

## Instrucciones para correr localmente

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd nestjs-hexagonal-companies-api
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta la aplicación**
   ```bash
   npm run start:dev
   ```

4. **Accede a la documentación Swagger**
   - [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

5. **Corre los tests**
   - Unit tests: `npm test`
   - E2E tests: `npm run test:e2e`
   - Performance tests (requiere [k6](https://k6.io/)): `npm run test:performance`

---

## Endpoints principales

- `POST /companies`: Registrar una nueva empresa (Pyme o Corporativa)
- `GET /companies/with-transfers`: Empresas que realizaron transferencias en el último mes
- `GET /companies/joined-last-month`: Empresas que se adhirieron en el último mes
- `GET /health`: Health check

---

## Lambda Function (Diseño teórico)

Se diseñó una AWS Lambda para registrar la adhesión de una empresa, validando los datos y almacenándolos.

**Código de la Lambda (TypeScript):**
```typescript
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { name, type } = JSON.parse(event.body || '{}');

    if (!name || !type) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Name and type are required' }),
      };
    }

    // Simulación de almacenamiento
    const company = {
      id: crypto.randomUUID(),
      name,
      type,
      joinedAt: new Date().toISOString(),
    };

    return {
      statusCode: 201,
      body: JSON.stringify(company),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
```

**Input esperado (JSON):**
```json
{
  "name": "Mi Empresa PYME",
  "type": "EMPRESA_PYME"
}
```

**Output esperado (JSON):**
```json
{
  "id": "uuid-generado",
  "name": "Mi Empresa PYME",
  "type": "EMPRESA_PYME",
  "joinedAt": "2025-06-27T15:30:00.000Z"
}
```

**Integración:**  
La Lambda puede ser llamada desde la API principal como un puerto/adaptador, permitiendo registrar empresas desde la nube o desde la propia API, manteniendo la independencia tecnológica.

---

¿Dudas o sugerencias?  
Puedes abrir un issue o contactarme para más información.