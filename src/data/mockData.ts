export interface Task {
  id: number;
  title: string;
  status: "Pending" | "In Progress" | "Completed";
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  tasks: Task[];
}

export const mockData: { employees: Employee[] } = {
  employees: [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer",
      tasks: [
        { id: 101, title: "Build login page", status: "Completed" },
        { id: 102, title: "Implement dashboard", status: "In Progress" },
        { id: 103, title: "Create responsive navigation", status: "Completed" },
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Developer",
      tasks: [
        { id: 104, title: "API integration", status: "Pending" },
        { id: 105, title: "Database optimization", status: "In Progress" },
      ],
    },
    {
      id: 3,
      name: "Carol Martinez",
      role: "UI/UX Designer",
      tasks: [
        { id: 106, title: "Design system updates", status: "Completed" },
        { id: 107, title: "User flow wireframes", status: "In Progress" },
        { id: 108, title: "Mobile mockups", status: "Pending" },
      ],
    },
    {
      id: 4,
      name: "David Chen",
      role: "DevOps Engineer",
      tasks: [
        { id: 109, title: "CI/CD pipeline setup", status: "Completed" },
        { id: 110, title: "Server monitoring", status: "Pending" },
      ],
    },
  ],
};
