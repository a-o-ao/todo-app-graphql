'use client'

import { useState, useEffect } from 'react'
import { Todo, TodoStatus } from '@/types'
import { Check, Plus } from 'lucide-react'

type Props = {
    todos: Todo[]
    onComplete: (id: number) => void
    onOpenEdit: (id?: number) => void
}

export default function TodoList({ todos, onComplete, onOpenEdit }: Props) {
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">TODO一覧</h1>
            <div className="space-y-2">
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className={`flex items-center justify-between p-4 border rounded-lg shadow-sm ${todo.status === 'COMPLETED' ? 'bg-gray-100 text-gray-500' : 'bg-white'
                            }`}
                    >
                        <button
                            onClick={() => onOpenEdit(todo.id)}
                            className="text-left flex-1 text-lg font-medium hover:underline"
                        >
                            {todo.title}
                        </button>
                        <button
                            onClick={() => onComplete(todo.id)}
                            className="ml-4 p-2 rounded-full hover:bg-gray-200"
                            disabled={todo.status === 'COMPLETED'}
                        >
                            <Check className="w-5 h-5 text-green-500" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center">
                <button
                    onClick={() => onOpenEdit()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    <Plus className="w-5 h-5" />
                    登録
                </button>
            </div>
        </div>
    )
}
