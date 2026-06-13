export class Impact {
    public static triggerShake() {
        if (navigator.vibrate) {
            try {
                navigator.vibrate(100);
            } catch (e) {
                this.fallbackShake();
            }
        } else {
            this.fallbackShake();
        }
    }

    private static fallbackShake() {
        document.body.classList.add('screen-shake');
        setTimeout(() => {
            document.body.classList.remove('screen-shake');
        }, 500);
    }
}
