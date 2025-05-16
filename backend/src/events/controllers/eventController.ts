import { Request, Response } from "express"

// Datos mockeados
const mockEvents = [
  {
    id: "1",
    title: "Conferencia de Tecnología",
    description: "Una conferencia sobre las últimas tendencias en tecnología",
    date: "2024-04-15T10:00:00Z",
    location: "Centro de Convenciones",
    imageUrl: "https://example.com/conf.jpg",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Workshop de Programación",
    description: "Aprende programación desde cero",
    date: "2024-04-20T14:00:00Z",
    location: "Espacio Coworking",
    imageUrl: "https://example.com/workshop.jpg",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  }
]

export const getEvents = (req: Request, res: Response) => {
  res.json({ events: mockEvents })
}
