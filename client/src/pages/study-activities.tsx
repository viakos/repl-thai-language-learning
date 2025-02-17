import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { StudyActivity } from "@shared/schema";
import { Link } from "wouter";

export default function StudyActivities() {
  const { data: activities, isLoading } = useQuery<StudyActivity[]>({
    queryKey: ["/api/study-activities"]
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Study Activities</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activities?.map((activity) => (
          <Link key={activity.id} href={`/study-activities/${activity.id}`}>
            <a className="block">
              <Card className="hover:bg-accent transition-colors">
                <CardHeader>
                  <CardTitle>{activity.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <div className="mt-2 text-sm font-medium">
                    Type: {activity.type}
                  </div>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
