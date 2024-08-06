import { Session } from '../../validations/user.validation';
import RootLayout from '../layouts/Root';

const Posts = ({ session }: { session: Session }) => {
  return <RootLayout session={session}>Posts</RootLayout>;
};

export default Posts;
