"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Participant } from "@/lib/types";
import { Trash2, Plus } from "lucide-react";

interface ParticipantListProps {
  participants: Participant[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
}

export function ParticipantList({ participants, onAdd, onRemove }: ParticipantListProps) {
  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  const onSubmit = handleSubmit((data) => {
    onAdd(data.name);
    reset();
  });

  return (
    <div className="w-full max-w-md space-y-4">
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          {...register("name", { required: true })}
          placeholder="Enter participant name"
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="space-y-2">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between p-3 bg-card rounded-lg"
          >
            <span className="font-medium">{participant.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(participant.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}