export async function getDataSimpleChart(preview) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "api/dot/2/"
    ); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
