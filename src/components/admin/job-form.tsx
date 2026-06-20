import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface JobOpeningView {
  id?: string;
  title: string;
  department: string;
  experience: string;
  location: string;
  type: string;
  skills: string[];
  published?: boolean;
}

export function JobForm({
  action,
  job,
}: {
  action: (formData: FormData) => void | Promise<void>;
  job?: JobOpeningView;
}) {
  return (
    <form action={action} className="admin-form-shell grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Job Title" name="title" defaultValue={job?.title} required minLength={3} placeholder="e.g. Planning Engineer" />
        
        <div className="grid gap-2">
          <Label htmlFor="department">Department</Label>
          <Select name="department" defaultValue={job?.department ?? "Engineering"}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Project Management", "Engineering", "QA/QC", "Safety", "Other"].map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Field label="Experience Required" name="experience" defaultValue={job?.experience} required placeholder="e.g. 3-5 Years" />
        <Field label="Location" name="location" defaultValue={job?.location} required placeholder="e.g. Chennai" />
        
        <div className="grid gap-2">
          <Label htmlFor="type">Job Type</Label>
          <Select name="type" defaultValue={job?.type ?? "Full-Time"}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Full-Time", "Part-Time", "Contract", "Internship"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="skills">Required Competencies / Skills (comma or line separated)</Label>
        <Textarea
          id="skills"
          name="skills"
          rows={3}
          defaultValue={job?.skills?.join(", ") ?? ""}
          placeholder="e.g. Primavera P6, MS Project (MSP), Delay Analysis"
          required
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input name="published" type="checkbox" defaultChecked={job?.published ?? true} />
        Published & Visible on public site
      </label>

      <Button type="submit" className="w-fit">
        <Save className="size-4" /> Save Job Opening
      </Button>
    </form>
  );
}

function Field(props: React.ComponentProps<typeof Input> & { label: string; name: string }) {
  const { label, name, ...inputProps } = props;
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...inputProps} />
    </div>
  );
}
