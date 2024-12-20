import { FC, useState } from 'react';
import AuthModal from './components/auth-modal/auth-modal';
import styles from './modal.module.css';
import RegModal from './components/reg-modal/reg-modal';

const Modal: FC = () => {
  const [isAuthModal, setIsAuthModal] = useState<boolean>(true);

  return (
    <div className={styles.wrapper}>
      <h1>Аутентификация</h1>
      {isAuthModal && <AuthModal setIsAuthModal={setIsAuthModal} />}
      {!isAuthModal && <RegModal setIsAuthModal={setIsAuthModal} />}
    </div>
  );
};

export default Modal;
