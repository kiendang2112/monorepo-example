import z from "zod";

export const CommonSchema = {
  idParams: z.object({
    id: z.coerce.number('ID is required'),
  }),
}
