import { Context } from 'hono';
import { formDataToObject } from '../utils';
import { createPostValidation } from '../validations/post.validation';
import { CreatePostResponse } from '../www/pages/Content';

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
      CreatePostResponse({
        error,
      })
    );
  }

  console.log(parsedData);

  c.set('err', undefined);
  return c.html(
    CreatePostResponse({
      success: true,
    })
  );
};
