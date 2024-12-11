import { FC, useState } from "react";
import { useAuth } from "../../../../api/store/useAuth";
import { Form, Input } from 'antd';
import styles from './reg-modal.module.css'
import { useFetch } from "../../../../api/useFetch";

type props = {
	setIsAuthModal: (param: boolean) => void;
}

const RegModal:FC<props> = ({setIsAuthModal}) => {
	const [form] = Form.useForm();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [password2, setPassword2] = useState<string>('');
	const [result, setResult] = useState<any>(null);

	const {registration} = useAuth();

	const	{fetching, isLoading, error} = useFetch(async () => {
		const res = await registration(username, password2);
		setResult(res.status);
	})

	return (
		<div className={styles.wrapper}>
			<div className={styles.formWrapper}>
			<Form
				form={form}
				name="dependencies"
				autoComplete="off"
				style={{ maxWidth: 600}}
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

				{/* Field */}
				<Form.Item
					label="Confirm Password"
					name="password2"
					dependencies={['password']}
					rules={[
						{
							required: true,
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									<span style={{ color: "black" }}>Пароли не совпадают!</span>
							);
							},
						}),
					]}
				>
					<Input.Password
						style={{padding: "0.6rem 1rem", fontSize: "2rem"}}
						value={password2}
						onChange={e => setPassword2(e.target.value)}
					/>
				</Form.Item>
			</Form>
			</div>
			<button
			disabled={
				(password !== password2) ||
				(password === '' || password2 === '' || username === '')
			}
				onClick={
					async () => {
						setResult('');
						await fetching();
					}}>
				зарегистрироваться
			</button>
			<div className={styles.errors}>
				<p>
					{isLoading && `Загрузка...`}
					{result === 400 && 'Пользователь с таким именем уже существует'}
					{!isLoading && result !== 401 && error && `${error}`}
				</p>
			</div>
			<div className={styles.changeModal}>
				<p>Уже зарегистрированы?</p>
				<button onClick={() => setIsAuthModal(true)}>Войти</button>
			</div>
		</div>
	)
}

export default RegModal;