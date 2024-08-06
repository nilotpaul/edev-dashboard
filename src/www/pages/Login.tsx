import LoginForm from '../components/forms/LoginForm';
import RootLayout from '../layouts/Root';

const Login = () => {
  return (
    <RootLayout index={false} session={null}>
      <div class='mx-auto flex min-h-[90vh] max-w-sm items-center justify-center'>
        <LoginForm />
      </div>
    </RootLayout>
  );
};

export default Login;
