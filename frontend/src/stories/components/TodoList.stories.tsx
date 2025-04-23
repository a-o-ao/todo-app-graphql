import type { Meta, StoryObj } from '@storybook/react'
import TodoList from '../../components/TodoList'
import type { Todo } from '@/types'

const meta: Meta<typeof TodoList> = {
    title: 'Components/TodoList',
    component: TodoList,
}

export default meta

type Story = StoryObj<typeof TodoList>

const mockTodos: Todo[] = [
    {
        id: 1,
        title: '買い物に行く',
        contents: '牛乳とパンを買う',
        status: 'PENDING',
        createdAt: '2025-04-22T10:00:00Z',
        updatedAt: '2025-04-22T10:00:00Z',
    },
    {
        id: 2,
        title: 'メール返信',
        contents: '',
        status: 'COMPLETED',
        createdAt: '2025-04-21T08:00:00Z',
        updatedAt: '2025-04-22T11:00:00Z',
    },
]

export const Default: Story = {
    args: {
        todos: mockTodos,
        onOpenEdit: (id?: number) => alert(`タイトルクリック: ${id}`),
        onComplete: (id: number) => alert(`完了にする: ${id}`),
    },
}
