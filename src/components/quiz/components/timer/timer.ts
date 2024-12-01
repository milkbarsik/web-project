

class TimerManager {

	constructor() {
		const data = sessionStorage.getItem('timer');
		if( data !== null) {
			JSON.parse(data).subscribers.map((name: string) => {
				this.subscribers[name] = () => {
					this.setTime(name);
				}
			});
			this.startTimer();
		}
	}

	private intervalId: number | null = null;
	private subscribers: any = {};

	subscribe (callback: any, name: string) {
		this.subscribers[name] = callback;
		this.selfSave();
		this.startTimer();
	}

	unsubscribe (name: string) {
		delete this.subscribers[name];
		this.selfSave();
		if(Object.keys(this.subscribers).length === 0) this.stopTimer();
	}

	setTime (name: string) {
		const data = sessionStorage.getItem(name);
		if (data !== null) {
			const quizObject = JSON.parse(data);
			quizObject.time--;
			sessionStorage.setItem(`${name}`, JSON.stringify(quizObject));
			if( quizObject.time <= 290) this.unsubscribe(name);
		}
	}

	private notifySubscribers() {
    for(const key in this.subscribers) {
			this.subscribers[key]();
		}
  }

	startTimer () {
		if(this.intervalId !== null || Object.keys(this.subscribers).length === 0) return;

		this.intervalId = window.setInterval(() => {
			this.notifySubscribers();
		}, 1000);
	}

	stopTimer () {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
		this.subscribers = {};
	}

	selfSave () {
		const data = {
			subscribers: Object.keys(this.subscribers)
		}
		sessionStorage.setItem('timer', JSON.stringify(
			data
		));
	}
}

const timerManager = new TimerManager();
export default timerManager;