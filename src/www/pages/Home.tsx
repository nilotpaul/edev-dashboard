import { Session } from '../../validations/user.validation';
import RootLayout from '../layouts/Root';

const Home = ({ session }: { session: Session }) => {
  return (
    <RootLayout session={session}>
      <div class='text-2xl font-bold text-green-500'>Tailwind is working!</div>
    </RootLayout>
  );
};

export default Home;
