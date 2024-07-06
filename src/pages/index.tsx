import { Button, TextInput } from '@/components';

export default function Home() {
  return (
    <main>
      <div className="p-2">
        <div className="p-1">
          <TextInput label="Username" size="md" labelType="floating" />
        </div>
        <div className="p-1">
          <Button size="sm" color="primary" ghost>
            Testing Button
          </Button>
        </div>
      </div>
    </main>
  );
}
