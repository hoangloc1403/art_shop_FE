import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import { SignUp } from '@/components/auth';

/**
 * Renders "SignUp" view
 * url: /sign_up
 * @page SignUp
 */
const SignUpView = () => {
  return (
    <>
      <Header />
      <SignUp />
      <Footer />
    </>
  );
};

export default SignUpView;
