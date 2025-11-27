import { Employee } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, ListTodo, Users } from "lucide-react";

interface DashboardStatsProps {
  employees: Employee[];
}

export const DashboardStats = ({ employees }: DashboardStatsProps) => {
  const allTasks = employees.flatMap((emp) => emp.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((task) => task.status === "Completed").length;
  const inProgressTasks = allTasks.filter((task) => task.status === "In Progress").length;
  const pendingTasks = allTasks.filter((task) => task.status === "Pending").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      color: "text-primary",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-success",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`h-10 w-10 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4">Task Completion Overview</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">{completionRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{completedTasks}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{inProgressTasks}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pending">{pendingTasks}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
