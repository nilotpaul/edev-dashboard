import type { Child, FC } from 'hono/jsx';
import { createContext, useContext } from 'hono/jsx';
import { Session } from '../../../validations/user.validation';

const initialSession: Session | null = null;

const SessionContext = createContext<Session | null>(initialSession);

export const SessionContextProvider: FC<{ children: Child; session: Session }> = ({
  children,
  session,
}) => {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export const getSession = () => useContext(SessionContext);
