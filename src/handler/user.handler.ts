import { Context } from 'hono';
import User from '../models/User';
import { comparePassword, hashPassword, setSessionCookie, signAccessToken } from '../utils/auth';
import { createUserSchema, loginSchema, Session } from '../validations/user.validation';
import CreateUserForm from '../www/components/forms/CreateUserForm';
import { formDataToObject } from '../utils';
import LoginIn from '../www/components/forms/LoginForm';
import { deleteCookie } from 'hono/cookie';
import { sessionCookieConfig } from '../config/jwt';
import { HTTPException } from 'hono/http-exception';

// @desc    Create user
// route    POST /api/v1/user/create
// access   private
export const createUserHandler = async (c: Context) => {
  const formData = await c.req.formData();
  const body = formDataToObject(formData);

  const { success, data: parsedBody, error } = createUserSchema.safeParse(body);

  if (!success || !parsedBody) {
    c.set('err', 'failed to parse input data');
    return c.html(
      CreateUserForm({
        error,
      })
    );
  }

  const existingUserPromise = User.findOne({ email: parsedBody.email });
  const usernameTakenPromise = User.findOne({ username: parsedBody.username });
  const [existingUser, usernameTaken] = await Promise.all([
    existingUserPromise,
    usernameTakenPromise,
  ]);

  // If username is not available
  if (usernameTaken?._id) {
    c.set('err', 'Username is taken');
    return c.html(
      CreateUserForm({
        error: 'Username is taken',
      })
    );
  }

  // If user exists in the database
  if (existingUser?._id) {
    c.set('err', 'User already exists');
    return c.html(
      CreateUserForm({
        error: 'User already exists',
      })
    );
  }

  const hashedPassword = await hashPassword(parsedBody.password);
  if (!hashedPassword) {
    c.set('err', 'Something went wrong while hashing the password');
    return c.html(
      CreateUserForm({
        error: 'Something went wrong while hashing the password',
      })
    );
  }

  const newUser = new User({ ...parsedBody, password: hashedPassword });
  const createdUser = await newUser.save();

  if (!createdUser) {
    c.set('err', 'Failed to create the user');
    return c.html(
      CreateUserForm({
        error: 'Failed to create the user',
      })
    );
  }

  c.res.headers.append('HX-Refresh', 'true');

  c.set('err', undefined);
  return c.html(
    CreateUserForm({
      successMessage: 'User created',
    })
  );
};

export const deleteUserHandler = async (c: Context) => {
  const session = c.get('session') as Session;
  const userId = c.req.query('userId');

  if (!userId || typeof userId !== 'string' || userId?.length === 0) {
    throw new HTTPException(400, { message: 'Invalid user id' });
  }

  const dbUser = await User.findById(userId);

  if (!dbUser?._id) {
    throw new HTTPException(404, { message: 'No user found' });
  }

  if (dbUser.role === 'superuser' || session.role !== 'superuser') {
    throw new HTTPException(401, { message: "You don't have permission to perform this action" });
  }

  if (String(dbUser._id) === String(session._id)) {
    throw new HTTPException(401, { message: 'You cannot delete your own account' });
  }

  const deletedUser = await User.deleteOne({ _id: userId });

  if (deletedUser?.deletedCount === 0) {
    throw new HTTPException(500, { message: 'Failed to delete user' });
  }

  return c.json('User deleted');
};

export const loginHandler = async (c: Context) => {
  const formData = await c.req.formData();
  const body = formDataToObject(formData);

  const { success, data: parsedBody, error } = loginSchema.safeParse(body);

  if (!success || !parsedBody) {
    c.set('err', 'failed to parse input data');
    return c.html(
      LoginIn({
        error,
      })
    );
  }

  const dbUser = await User.findOne({ email: parsedBody.email });

  if (!dbUser?._id) {
    c.set('err', "User doesn't exist");
    return c.html(
      LoginIn({
        error: "User doesn't exist",
      })
    );
  }

  if (!(await comparePassword(parsedBody.password, dbUser.password))) {
    c.set('err', 'Invalid email or password');
    return c.html(
      LoginIn({
        error: 'Invalid email or password',
      })
    );
  }

  const token = signAccessToken({
    _id: dbUser._id,
    username: dbUser.username,
    email: dbUser.email,
    role: dbUser.role,
  });

  if (!token) {
    c.set('err', 'Failed to sign access token');
    return c.html(
      LoginIn({
        error: 'Failed to sign access token',
      })
    );
  }

  // TODO: check why here only _id works but not id
  const updatedUser = await User.updateOne({ _id: dbUser._id }, { accessToken: token });

  if (!updatedUser || updatedUser.modifiedCount === 0) {
    c.set('err', `modifiedCount: ${updatedUser.modifiedCount} upsertId: ${updatedUser.upsertedId}`);
    return c.html(
      LoginIn({
        error: 'Failed for some reason. Try again later',
      })
    );
  }

  setSessionCookie(c, token);

  c.res.headers.append('HX-Redirect', '/');

  c.set('err', undefined);
  return c.html(
    LoginIn({
      successMessage: 'Logged in',
    })
  );
};

export const logoutHandler = async (c: Context) => {
  deleteCookie(c, 'session_token', sessionCookieConfig);
  c.set('session', null);

  c.res.headers.set('HX-Redirect', '/login');

  return c.json('OK');
};
