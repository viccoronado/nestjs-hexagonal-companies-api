import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiCompanyResponses = () => {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'Operación exitosa' }),
    ApiResponse({ status: 400, description: 'Solicitud inválida' }),
    ApiResponse({ status: 500, description: 'Error interno del servidor' })
  );
};