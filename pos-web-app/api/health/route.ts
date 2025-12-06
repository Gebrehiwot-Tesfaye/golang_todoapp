export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"}/health`)
    const data = await response.json()
    return Response.json({ status: "ok", backend: data })
  } catch (error) {
    return Response.json({ status: "error", message: String(error) }, { status: 500 })
  }
}
