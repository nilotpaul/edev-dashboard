import { User } from '../../../types';
import { getSession } from './context/SessionContext';

const RegisteredUserList = ({ users }: { users: User[] }) => {
  const session = getSession();

  return (
    <div class='mt-6 flex flex-col'>
      <div class='-m-1.5 overflow-x-auto'>
        <div class='inline-block min-w-full p-1.5 align-middle'>
          <div class='overflow-hidden rounded-lg border dark:border-neutral-700'>
            <table class='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
              <thead class='bg-gray-50 dark:bg-neutral-700'>
                <tr>
                  <th
                    scope='col'
                    class='px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-400'
                  >
                    Username
                  </th>
                  <th
                    scope='col'
                    class='px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-400'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    class='px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-neutral-400'
                  >
                    Role
                  </th>
                  <th
                    scope='col'
                    class='px-6 py-3 text-end text-xs font-medium uppercase text-gray-500 dark:text-neutral-400'
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class='divide-y divide-gray-200 dark:divide-neutral-700'>
                {users.map((user, idx) => (
                  <tr key={`${user.id}-${idx}`}>
                    <td class='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-neutral-200'>
                      {user.username}
                    </td>
                    <td class='whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-neutral-200'>
                      {user.email}
                    </td>
                    <td class='whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-neutral-200'>
                      {user.type}
                    </td>
                    <td class='whitespace-nowrap px-6 py-4 text-end text-sm font-medium'>
                      <button
                        hx-delete={`/api/v1/user/delete?userId=${user.id}`}
                        hx-swap='delete'
                        hx-target='closest tr'
                        hx-disable={user.id === session?.id ? true : undefined}
                        disabled={user.id === session?.id}
                        type='button'
                        class='inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-red-600 hover:text-red-800 focus:text-red-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUserList;
