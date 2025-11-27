import { useState, useEffect } from "react";
import { mockData, Employee, Task } from "@/data/mockData";
import { DashboardStats } from "@/components/DashboardStats";
import { TaskFilters } from "@/components/TaskFilters";
import { EmployeeCard } from "@/components/EmployeeCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { ClipboardList } from "lucide-react";

const STORAGE_KEY = "employee-task-tracker";

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockData.employees;
  });
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const handleAddTask = (employeeId: number, taskTitle: string, taskStatus: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      status: taskStatus as Task["status"],
    };

    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === employeeId
          ? { ...emp, tasks: [...emp.tasks, newTask] }
          : emp
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Employee Task Tracker</h1>
                <p className="text-sm text-muted-foreground">Manage team tasks and progress</p>
              </div>
            </div>
            <AddTaskDialog employees={employees} onAddTask={handleAddTask} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
            <DashboardStats employees={employees} />
          </section>

          <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold">Team Tasks</h2>
              <TaskFilters selectedFilter={filterStatus} onFilterChange={setFilterStatus} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {employees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  filterStatus={filterStatus}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Employee Task Tracker - Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
