import { ROOM_USER } from './types'

const camMaking = async () => {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
		console.log(stream);
		return {
			type: ROOM_USER,
			payload: stream
		}
	}
	catch(e) {
		console.log(e);
	}
}


export { camMaking }
