import axios from "axios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

type Todo = {
	id: number,
	task: string,
	created_at: string,
	completed_at: string,
	completed: boolean
};

const def: Todo[] = [
	{
		id: 1,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	},
	{
		id: 2,
		task: "Learn Spring",
		created_at: "1315",
		completed_at: "1315",
		completed: false
	}
]

const Todo = () => {
	const [todos, setTodos] = useState<Todo[]>(def);

	useEffect(() => {
		const fetchTodoList = async () => {
			try {
				const res = await axios.get("http://localhost:8080/api/todos");
				console.log(res.data[0]);
				if (res.data.length > 0)
					setTodos(res.data);
			} catch (e) {
				console.warn("axios failed: ", e);
			}
		}
		fetchTodoList();
	}, []);

	return (
		<main className='flex-1 mt-20 flex flex-col mx-20 px-16 py-5 gap-5 overflow-auto'>
			<ul className='flex flex-col w-full'>
				{todos.map(todo => {
					return (
					<li key={todo.id} className='flex p-2 min-h-20 border-b border-white/20 last:border-0 justify-between items-center gap-8'>
						<input className='w-5 h-5 cursor-pointer' type='checkbox'>
						</input>
						<span className='text-2xl playwrite flex justify-start items-center flex-2'>{todo.task}</span>
						<button className='flex justify-center items-center transition-all rounded-full hover:bg-white/6 duration-200 w-12 h-12 cursor-pointer hover:scale-110'>
							<Trash />
						</button>
					</li> 
					)
				})}
			</ul>
		</main>
	)
}

export default Todo;