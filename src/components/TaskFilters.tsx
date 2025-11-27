import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, ListTodo, CircleDashed } from "lucide-react";

interface TaskFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TaskFilters = ({ selectedFilter, onFilterChange }: TaskFiltersProps) => {
  const filters = [
    { value: "All", label: "All Tasks", icon: ListTodo },
    { value: "Pending", label: "Pending", icon: CircleDashed },
    { value: "In Progress", label: "In Progress", icon: Clock },
    { value: "Completed", label: "Completed", icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={selectedFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className="gap-2"
        >
          <filter.icon className="h-4 w-4" />
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
