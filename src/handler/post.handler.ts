import { Context } from 'hono';
import { formDataToObject } from '../utils';
import { createPostValidation } from '../validations/post.validation';
import { createPostResponse } from '../www/pages/Content';

export const createPostHandler = async (c: Context) => {
  const formData = await c.req.formData();
  const body = formDataToObject(formData);

  const {
    success,
    data: parsedData,
    error,
  } = createPostValidation.safeParse({
    ...body,
    content: JSON.parse(body?.content ?? '{}'),
  });

  if (!success || !parsedData) {
    c.set('err', error?.message);
    return c.html(
      createPostResponse({
        error,
      })
    );
  }

  console.log(parsedData);

  c.set('err', undefined);
  return c.html(
    createPostResponse({
      successMessage: 'Post created',
    })
  );
};
