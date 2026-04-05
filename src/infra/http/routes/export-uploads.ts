import { exportUploads } from "@/app/functions/export-uploads";
import { unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportUploadsRoute: FastifyPluginAsyncZod = async (server) => {
    server.post('/uploads/exports', {
        schema: {
            summary: 'Export Uploads',
            tags: ['Uploads'],
            querystring: z.object({
                searchQuery: z.string().optional(),
                sortBy: z.enum(['createdAt']).optional(),
                sortDirection: z.enum(['asc', 'desc']).optional(),
                page: z.coerce.number().int().positive().optional().default(1),
                pageSize: z.coerce.number().int().positive().optional().default(20),
            }),
            response: {
                200: z.object({ 
                    reportUrl: z.string()
                })
            }
        }
    },
    async (request, reply) => {
        const { searchQuery } = request.query;
        const result = await exportUploads({ searchQuery });
        const { reportUrl } = unwrapEither(result);

        return reply.status(200).send({ reportUrl });
    }
    );
}