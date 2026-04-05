import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { serializerCompiler, validatorCompiler, hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { uploadImageRoute } from './routes/upload-image';
import fastifyMultipart from '@fastify/multipart';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { transformSwaggerSchema } from './transform-swagger-schema';
import { getUploadsRoute } from './routes/get-uploads';
import { exportUploadsRoute } from './routes/export-uploads';

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error.', 
      issues: error.validation
    });
  }
  console.error(error);
  reply.status(500).send({ message: 'Internal server error.' });
});

server.register(fastifyCors, {
  origin: '*',
});
server.register(fastifyMultipart);
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Upload Server',
      version: '1.0.0'
    }
  },
  transform: transformSwaggerSchema
});
server.register(fastifySwaggerUi, {
  routePrefix: '/docs'
});

server.register(uploadImageRoute);
server.register(getUploadsRoute);
server.register(exportUploadsRoute);

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('Server is running on http://localhost:3333');
});