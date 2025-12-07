import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ])
  }),

  http.get('/api/users/:id', ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      id: Number(id),
      name: 'John Doe',
    })
  }),
]
