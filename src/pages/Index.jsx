import { useState } from "react";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", dueDate: "2023-10-01", completed: false },
    { id: 2, title: "Task 2", dueDate: "2023-10-02", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, title: newTask, dueDate: "2023-10-03", completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
              />
              <div>
                <p className="text-lg">{task.title}</p>
                <p className="text-sm text-muted-foreground">{task.dueDate}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Modal>
                <ModalTrigger asChild>
                  <Button variant="outline" onClick={() => setSelectedTask(task)}>
                    Edit
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input
                        value={selectedTask?.title || ""}
                        onChange={(e) =>
                          setSelectedTask({ ...selectedTask, title: e.target.value })
                        }
                      />
                      <Button
                        onClick={() => {
                          setTasks(
                            tasks.map((t) =>
                              t.id === selectedTask.id ? selectedTask : t
                            )
                          );
                          setSelectedTask(null);
                        }}
                      >
                        Save
                      </Button>
                    </CardContent>
                  </Card>
                </ModalContent>
              </Modal>
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Input
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={addTask} className="mt-2">
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default Index;