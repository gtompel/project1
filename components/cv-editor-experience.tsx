import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { CVData } from '@/lib/cv-data';

interface ExperienceProps {
  data: CVData['experience'];
  onChange: (index: number, field: keyof CVData['experience'][0], value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}
export function ExperienceForm({ data, onChange, onAdd, onRemove }: ExperienceProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Опыт работы</h3>
        <Button onClick={onAdd} size="sm">
          <Plus className="h-4 w-4 mr-2" /> Добавить опыт
        </Button>
      </div>
      <div className="space-y-4">
        {data.map((exp, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Компания"
                    value={exp.company}
                    onChange={(e) => onChange(index, 'company', e.target.value)}
                  />
                  <Input
                    placeholder="Период"
                    value={exp.period}
                    onChange={(e) => onChange(index, 'period', e.target.value)}
                  />
                  <Input
                    placeholder="Должность"
                    value={exp.position}
                    onChange={(e) => onChange(index, 'position', e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => onRemove(index)}
                  variant="outline"
                  size="sm"
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                placeholder="Описание"
                value={exp.description}
                onChange={(e) => onChange(index, 'description', e.target.value)}
                rows={2}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
