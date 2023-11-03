self.addEventListener("push", async (e) => {

  const data = await e.data.json();
  console.log(data)

  self.registration.showNotification("Скоро дедлайн задачи!", {
    body: data.title,
  });
});

console.log("Service worker loaded");
