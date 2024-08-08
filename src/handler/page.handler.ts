import { Context } from 'hono';

import Home from '../www/pages/Home';
import Posts from '../www/pages/Posts';
import Users from '../www/pages/Users';
import UserModel from '../models/User';
import Content from '../www/pages/Content';

export const homepageHandler = (c: Context) => {
  return c.html(Home({ session: c.get('session') }));
};

export const postpageHandler = (c: Context) => {
  return c.html(Posts({ session: c.get('session') }));
};

export const userpageHandler = async (c: Context) => {
  const users = await UserModel.find()
    .select('username email role')
    .sort({ role: -1, createdAt: 1 });

  return c.html(Users({ session: c.get('session'), registeredUsers: users }));
};

export const contentpageHandler = async (c: Context) => {
  return c.html(Content({ session: c.get('session') }));
};
