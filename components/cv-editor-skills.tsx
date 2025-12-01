import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CVData } from '@/lib/cv-data';

interface SkillsProps {
  data: CVData['skills'];
  onChange: (field: keyof CVData['skills'], value: string) => void;
}
export function SkillsForm({ data, onChange }: SkillsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Технические навыки</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="frontend">Frontend</Label>
          <Input
            id="frontend"
            value={data.frontend}
            onChange={(e) => onChange('frontend', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="backend">Backend</Label>
          <Input
            id="backend"
            value={data.backend}
            onChange={(e) => onChange('backend', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="devops">DevOps</Label>
          <Input
            id="devops"
            value={data.devops}
            onChange={(e) => onChange('devops', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="additional">Дополнительно</Label>
          <Input
            id="additional"
            value={data.additional}
            onChange={(e) => onChange('additional', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
