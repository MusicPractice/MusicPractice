import {randint} from "~/utils/random";

/**
 * 随机频率的服务
 * 全部成员静态，当成一个全局对象来使用
 */
export default class RandomFrequent {
    static freq: number = randint(27, 4186);
    static history: Array<{ answer: number, guess: number, result: boolean }> = [];
    static correctCount: number = 0; // 正确次数
    // 每次播放时长
    static duration: number = 0.5;  // s

    // nuxt 报错，window is not defined，需要使用浏览器来判断
    static audioContext = process.client ? new window.AudioContext() : null;

    /**
     * 此时此刻，用户是否已经验证过了
     * 如果返回false，则表示用户目前可以点击“验证”按钮
     * true，表示不能点击验证，已经验证过了
     */
    static isValid: boolean = false;

    get accuracy(): number {
        if (RandomFrequent.history.length === 0) return 0;
        return RandomFrequent.correctCount / RandomFrequent.history.length;
    }

    static playSound(): void {
        if (this.audioContext === null) {
            console.warn('当前是非浏览器环境，不能播放')
            return;
        }
        const oscillator = this.audioContext.createOscillator();

        // 设置频率
        oscillator.frequency.value = this.freq;

        // 将 OscillatorNode 连接到音频目标
        oscillator.connect(this.audioContext.destination);

        // 开始播放
        oscillator.start(this.audioContext.currentTime);

        // 停止播放
        oscillator.stop(this.audioContext.currentTime + this.duration);
    }

    /**
     * 随机刷新频率
     */
    static update(): void {
        this.freq = randint(100, 1000);
        this.isValid = false;
    }

    /**
     * 验证用户猜想
     * @param n {number} 用户输入的频率整数
     */
    static valid(n: number): boolean {
        this.isValid = true;
        const res = n === this.freq;
        if (res) this.correctCount++;
        this.history.push({
            answer: this.freq,
            guess: n,
            result: res,
        })
        return res;
    }

    static clearHistory(): void {
        this.history = [];
    }
}