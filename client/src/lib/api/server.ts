interface RequestBody {
  query: string
}

export const server = {
  fetch: async (body: RequestBody) => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return response.json()
  }
}
