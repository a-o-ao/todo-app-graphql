export type Todo = {
    id: number
    title: string
    contents?: string
    status: 'PENDING' | 'COMPLETED'
    createdAt: string
    updatedAt: string
}

export type TodoStatus = 'PENDING' | 'COMPLETED';
