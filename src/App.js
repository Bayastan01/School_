import React from 'react';
import WelcomeStack from './stacks/WelcomeStack';
import ParentStack from './stacks/ParentStack';
import SellerStack from './stacks/SellerStack';
import StudentScreen from './screens/StudentScreen';

const App = () => {
  const is_authorized = false;
  const user_type = 'seller';

  return (
    <>
      {!is_authorized ? (
        <WelcomeStack />
      ) : user_type === 'parent' ? (
        <ParentStack />
      ) : user_type === 'student' ? (
        <StudentScreen />
      ) : user_type === 'seller' ? (
        <SellerStack />
      ) : null}
    </>
  );
};

export default App;
