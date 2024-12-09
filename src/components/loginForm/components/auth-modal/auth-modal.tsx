import { FC, useState } from "react";
import { useAuth } from "../../../../api/store/useAuth";
import styles from './auth-modal.module.css'

import { Form, Input } from 'antd';

type props = {
	setIsAuthModal: (param: boolean) => void;
}

const AuthModal:FC<props> = ({setIsAuthModal}) => {

	const [form] = Form.useForm();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const {login} = useAuth();

	return (
		<div className={styles.wrapper}>
			<div className={styles.formWrapper}>
			<Form
				form={form}
				name="dependencies"
				autoComplete="off"
				layout="vertical"
			>
				<Form.Item label="Username" name="username" rules={[{ required: true }]}>
					<Input
						style={{padding: "0.6rem 1rem", fontSize: "2rem"}}
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</Form.Item>

				<Form.Item label="Password" name="password" rules={[{ required: true }]}>
					<Input.Password
						style={{padding: "0.6rem 1rem", fontSize: "2rem"}}
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</Form.Item>
			</Form>
			</div>
			<button
				disabled={
					(password === '' || username === '')
				}
				onClick={() => login(username, password)}>
				войти
			</button>
			<div className={styles.changeModal}>
				<h3>Еще не зарегистрированы?</h3>
				<button onClick={() => setIsAuthModal(false)}>Зарегистрироваться</button>
			</div>
		</div>
	)
}

export default AuthModal;