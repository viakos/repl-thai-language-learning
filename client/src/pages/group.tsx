import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import type { Group } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupDetail() {
  const { id } = useParams();
  const { data: group, isLoading } = useQuery<Group>({
    queryKey: [`/api/groups/${id}`],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Group Details</h1>

      <Card>
        <CardHeader>
          <CardTitle>{group.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{group.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
