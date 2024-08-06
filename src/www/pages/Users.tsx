import { User } from '../../../types';
import { Session } from '../../validations/user.validation';
import CreateUserForm from '../components/forms/CreateUserForm';
import RegisteredUserList from '../components/RegisteredUserList';
import RootLayout from '../layouts/Root';

const Users = ({ session, registeredUsers }: { session: Session; registeredUsers: User[] }) => {
  return (
    <RootLayout session={session}>
      <div class='grid grid-cols-[1fr,2fr] gap-6'>
        <div>
          <h1 class='text-xl font-bold text-black dark:text-white'>Create User</h1>
          <CreateUserForm />
        </div>

        <div>
          <h1 class='mb-12 text-xl font-bold text-black dark:text-white'>Registered Users</h1>
          <RegisteredUserList users={registeredUsers} />
        </div>
      </div>
    </RootLayout>
  );
};

export default Users;
