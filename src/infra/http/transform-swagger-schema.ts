import { jsonSchemaTransform } from "fastify-type-provider-zod";

type TransformSchemaData = Parameters<typeof jsonSchemaTransform>[0];

export function transformSwaggerSchema(data: TransformSchemaData) {
    const { schema, url } = jsonSchemaTransform(data);
    const transformedSchema = schema as any;
    if (transformedSchema.consumes?.includes('multipart/form-data')) {
        if (transformedSchema.body === undefined) {
            transformedSchema.body = {
                type: 'object',
                properties: {},
                required: []    
            };
        }
        transformedSchema.body.properties.file = {
            type: 'string',
            format: 'binary'
        };
        transformedSchema.body.required.push('file');
    }

    return {
        schema,
        url
    };
}