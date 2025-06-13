import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import { SignIn } from '@/components/auth';

/**
 * Renders "SignIn" view
 * url: /sign_in
 * @page SignIn
 */
const SignInView = () => {
  return (
    <>
      <Header />
      <SignIn />
      <Footer />
    </>
  );
};

export default SignInView;
