import { clsx, type ClassValue } from 'clsx';
import { Context, Handler, Next } from 'hono';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formDataToObject = (formData: FormData) => {
  const obj: Record<string, any> = {};

  formData.forEach((value, key) => {
    obj[key] = value;
  });

  return obj;
};

export const makeHandler = (handler: Handler<any, any, any, Promise<Response>>) => {
  return async (c: Context, next: Next) => {
    const res = await handler(c, next);

    if (res.status !== 200) {
      console.error(
        `HTTP ERROR with status: ${res.status}, err: ${c.get('err')} and path: ${c.req.path}`
      );
    }

    return res;
  };
};
