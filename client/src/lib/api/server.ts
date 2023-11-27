interface RequestBody<TVariables> {
  query: string  // GraphQL query
  variables?: TVariables  // Object with variables for the query
}

export const server = {
  fetch: async <TData = any, TVariables = any>(
    body: RequestBody<TVariables>
  ) => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return await response.json() as Promise<{ data: TData }>
  }
}
