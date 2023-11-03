export const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("ServiceWorker не поддерживается в вашем браузере!")
    }

    if (!('Notification' in window)) {
        throw new Error("Браузер не поддерживает API уведомлений")
    }
}

export const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('/sw.js')
    
    return registration
}

export const registerNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
        throw new Error("Пользователь отключил уведомления")
    }
}