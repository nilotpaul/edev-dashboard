import { Session } from '../../validations/user.validation';

const User = (user: Session) => {
  return (
    <span class='inline-flex size-[46px] items-center justify-center rounded-full bg-white/10 text-sm font-semibold uppercase leading-none text-white'>
      {user.username.split('')[0] + user.username.split('')[user.username.length - 1]}
    </span>
  );
};

export default User;
