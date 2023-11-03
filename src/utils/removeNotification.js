const URL = "http://localhost:5174/cancel-notification";

// Можно всё вынести в отдельный сервис, создав services/...
export async function removeNotification(id) {
  try {
    const res = await fetch(URL, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
