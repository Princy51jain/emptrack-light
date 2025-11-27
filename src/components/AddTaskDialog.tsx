import { useState } from "react";
import { Employee } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddTaskDialogProps {
  employees: Employee[];
  onAddTask: (employeeId: number, taskTitle: string, taskStatus: string) => void;
}

export const AddTaskDialog = ({ employees, onAddTask }: AddTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskTitle.trim() || !selectedEmployee) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddTask(parseInt(selectedEmployee), taskTitle, taskStatus);
    
    toast({
      title: "Success",
      description: "Task added successfully",
    });
    
    setTaskTitle("");
    setSelectedEmployee("");
    setTaskStatus("Pending");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task and assign it to an employee.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="employee">Assign To</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger id="employee">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                      {emp.name} - {emp.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={taskStatus} onValueChange={setTaskStatus}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
