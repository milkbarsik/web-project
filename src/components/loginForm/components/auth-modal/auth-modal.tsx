import { FC, useState } from "react";
import { useAuth } from "../../../../api/store/useAuth";
import styles from './auth-modal.module.css'
import { useFetch } from "../../../../api/useFetch";
import { Form, Input } from 'antd';

type props = {
	setIsAuthModal: (param: boolean) => void;
}

const AuthModal:FC<props> = ({setIsAuthModal}) => {

	const [form] = Form.useForm();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [result, setResult] = useState<any>(null)

	const {login} = useAuth();

	const {fetching, isLoading, error} = useFetch(async () => {
		const res = await login(username, password);
		setResult(res.status);
	})

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
				onClick={
					async () => {
						setResult('');
						await fetching();
				}}>
				войти
			</button>
			<div className={styles.errors}>
				<p>
					{isLoading && `Загрузка...`}
					{result === 401 && 'Неверное имя пользователя или пароль'}
					{!isLoading && result !== 401 && error && `${error}`}
				</p>
			</div>
			<div className={styles.changeModal}>
				<h3>Еще не зарегистрированы?</h3>
				<button onClick={() => setIsAuthModal(false)}>Зарегистрироваться</button>
			</div>
		</div>
	)
}

export default AuthModal;