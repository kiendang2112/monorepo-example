import z from "zod";

export const CommonSchema = {
  idParams: z.object({
    id: z.coerce.number('ID must be a number'),
  }),
}
