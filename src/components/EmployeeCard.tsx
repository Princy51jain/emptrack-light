import { Employee } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface EmployeeCardProps {
  employee: Employee;
  filterStatus: string;
}

export const EmployeeCard = ({ employee, filterStatus }: EmployeeCardProps) => {
  const filteredTasks =
    filterStatus === "All"
      ? employee.tasks
      : employee.tasks.filter((task) => task.status === filterStatus);

  if (filteredTasks.length === 0) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "In Progress":
        return "bg-warning text-warning-foreground";
      case "Pending":
        return "bg-pending text-pending-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{employee.name}</h3>
          <p className="text-sm text-muted-foreground">{employee.role}</p>
        </div>
        <Badge variant="secondary" className="flex-shrink-0">
          {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
        </Badge>
      </div>

      <div className="mt-4 space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-3 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium flex-1">{task.title}</p>
              <Badge className={`${getStatusColor(task.status)} flex-shrink-0 text-xs`}>
                {task.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
