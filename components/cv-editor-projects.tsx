import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectListProps {
  data: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}
export function ProjectList({ data, onChange, onAdd, onRemove }: ProjectListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Ключевые проекты</h3>
        <Button onClick={onAdd} size="sm">
          <Plus className="h-4 w-4 mr-2" /> Добавить проект
        </Button>
      </div>
      <div className="space-y-3">
        {data.map((project, index) => (
          <div key={index} className="flex gap-3">
            <Input
              placeholder="Название проекта"
              value={project}
              onChange={(e) => onChange(index, e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => onRemove(index)} variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
