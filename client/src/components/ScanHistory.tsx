
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TeamMember {
  name?: string;
  email?: string;
  phone?: string;
}

interface ScanHistoryItem {
  id: string;
  ticketId: string;
  registrationId: string;
  registrationName: string;
  email: string;
  organization: string;
  groupSize: number;
  teamMembers?: TeamMember[];
  customFieldData?: Record<string, string>;
  scansUsed: number;
  maxScans: number;
  scannedAt: string;
  valid: boolean;
}

export default function ScanHistory() {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScanHistory();
  }, []);

  const fetchScanHistory = async () => {
    try {
      const response = await fetch("/api/admin/scan-history?limit=50", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error("Failed to fetch scan history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Scan History</CardTitle>
          <CardDescription>Loading scan history...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan History</CardTitle>
        <CardDescription>
          Recent QR code scans ({history.length} records)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No scan history yet</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Group Size</TableHead>
                  <TableHead>Team Members</TableHead>
                  <TableHead>Scans</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Scanned At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((scan) => (
                  <TableRow key={scan.id}>
                    <TableCell className="font-mono text-xs">{scan.ticketId.slice(0, 8)}...</TableCell>
                    <TableCell className="font-medium">{scan.registrationName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{scan.organization || "N/A"}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{scan.groupSize}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {scan.teamMembers && scan.teamMembers.length > 0 ? (
                        <div className="space-y-1">
                          {scan.teamMembers.slice(0, 2).map((member, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground">
                              {member.name}
                            </div>
                          ))}
                          {scan.teamMembers.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{scan.teamMembers.length - 2} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {scan.scansUsed}/{scan.maxScans}
                    </TableCell>
                    <TableCell>
                      {scan.valid ? (
                        <Badge variant="default" className="flex items-center gap-1 w-fit">
                          <CheckCircle2 className="h-3 w-3" />
                          Valid
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                          <XCircle className="h-3 w-3" />
                          Invalid
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{formatDateTime(scan.scannedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
