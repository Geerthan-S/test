"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CareerSetting } from "@/lib/repositories";

export function CareerSettingsForm({
  action,
  setting,
}: {
  action: (formData: FormData) => void | Promise<void>;
  setting?: CareerSetting;
}) {
  const [actionType, setActionType] = useState(setting?.internshipActionType ?? "modal");

  return (
    <form action={action} className="admin-form-shell grid gap-6 rounded-lg border border-border/40 p-6 bg-card/30">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Internship Button Action</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure the button behavior for the "Apply for Internship" section on the Careers page.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="internshipButtonText">Button Label Text</Label>
        <Input
          id="internshipButtonText"
          name="internshipButtonText"
          defaultValue={setting?.internshipButtonText ?? "Apply for Internship"}
          required
          placeholder="Apply for Internship"
        />
      </div>

      <div className="grid gap-3">
        <Label>Button Action Behavior</Label>
        <div className="flex flex-col gap-3 mt-1">
          <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
            <input
              type="radio"
              name="internshipActionType"
              value="modal"
              checked={actionType === "modal"}
              onChange={() => setActionType("modal")}
              className="accent-primary"
            />
            <div>
              <p>Open General Application Form (Modal)</p>
              <p className="text-xs text-muted-foreground font-normal">
                Launches the standard on-site application form directly.
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
            <input
              type="radio"
              name="internshipActionType"
              value="url"
              checked={actionType === "url"}
              onChange={() => setActionType("url")}
              className="accent-primary"
            />
            <div>
              <p>Redirect to External URL</p>
              <p className="text-xs text-muted-foreground font-normal">
                Sends the applicant to a custom external form or link (e.g. Google Forms).
              </p>
            </div>
          </label>
        </div>
      </div>

      {actionType === "url" && (
        <div className="grid gap-2">
          <Label htmlFor="internshipActionUrl">Redirection URL / External Link</Label>
          <Input
            id="internshipActionUrl"
            name="internshipActionUrl"
            type="url"
            defaultValue={setting?.internshipActionUrl ?? ""}
            required
            placeholder="https://forms.google.com/..."
          />
        </div>
      )}

      <Button type="submit" className="w-fit">
        <Save className="size-4" /> Save Internship Settings
      </Button>
    </form>
  );
}
