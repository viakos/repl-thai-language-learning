import { useQuery } from "@tanstack/react-query";
import type { StudySession, StudyActivity } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Sessions() {
  const { data: sessions, isLoading: sessionsLoading } = useQuery<StudySession[]>({
    queryKey: ["/api/study-sessions"],
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery<StudyActivity[]>({
    queryKey: ["/api/study-activities"],
  });

  if (sessionsLoading || activitiesLoading) {
    return <div>Loading...</div>;
  }

  const getActivityName = (activityId: number) => {
    return activities?.find((a) => a.id === activityId)?.name ?? "Unknown Activity";
  };

  // Calculate statistics
  const totalSessions = sessions?.length ?? 0;
  const averageScore =
    sessions && sessions.length > 0
      ? Math.round(
          sessions.reduce((acc, session) => acc + (session.score ?? 0), 0) /
            sessions.length
        )
      : 0;
  const bestScore =
    sessions && sessions.length > 0
      ? Math.max(...sessions.map((s) => s.score ?? 0))
      : 0;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Study Sessions</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bestScore}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions
                ?.sort(
                  (a, b) =>
                    new Date(b.startTime).getTime() -
                    new Date(a.startTime).getTime()
                )
                .map((session) => {
                  const duration = session.endTime
                    ? Math.round(
                        (new Date(session.endTime).getTime() -
                          new Date(session.startTime).getTime()) /
                          1000 /
                          60
                      )
                    : 0;

                  return (
                    <TableRow key={session.id}>
                      <TableCell>
                        {format(new Date(session.startTime), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell>{getActivityName(session.activityId)}</TableCell>
                      <TableCell>{duration} minutes</TableCell>
                      <TableCell>{session.score}%</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
