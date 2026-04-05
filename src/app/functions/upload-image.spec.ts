import { Readable } from "node:stream";
import { isRight, isLeft, unwrapEither } from "@/shared/either";
import { eq } from "drizzle-orm";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { uploadImage } from "./upload-image";
import { randomUUID } from "node:crypto";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { InvalidFileFormat } from "./errors/invalid-file-format";

describe('upload image', () => {
    beforeAll(() => {
        vi.mock('@/infra/storage/upload-file-to-storage', async () => {
            return {
                uploadFileToStorage: vi.fn().mockImplementation(() => {
                    return {
                        key: `${randomUUID()}.jpg`,
                        url: 'https://storage.com/123.jpg'
                    }
                })
            }
        });
    });

    it('should be able to upload an image', async () => {
        const fileName = `${randomUUID()}.jpg`;
        const sut = await uploadImage({
            fileName,
            contentType: 'image/jpg',
            contentStream: Readable.from([])
        });
        expect(isRight(sut)).toBe(true);

        const result = await db.select().from(schema.uploads).where(eq(schema.uploads.name, fileName));
        expect(result).toHaveLength(1);
    });

    it('should not be able to upload an image', async () => {
        const fileName = `${randomUUID()}.pdf`;
        const sut = await uploadImage({
            fileName,
            contentType: 'image/pdf',
            contentStream: Readable.from([])
        });
        expect(isLeft(sut)).toBe(true);
        expect(unwrapEither(sut)).toBeInstanceOf(InvalidFileFormat);
    });
});