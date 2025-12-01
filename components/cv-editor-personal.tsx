import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CVData } from '@/lib/cv-data';

interface PersonalProps {
  data: CVData['personal'];
  onChange: (field: keyof CVData['personal'], value: string) => void;
}
export function PersonalForm({ data, onChange }: PersonalProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Личные данные</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input id="name" value={data.name} onChange={(e) => onChange('name', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="title">Должность</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => onChange('github', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="telegram">Telegram</Label>
          <Input
            id="telegram"
            value={data.telegram}
            onChange={(e) => onChange('telegram', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
