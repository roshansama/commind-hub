import { formatDistanceToNow } from "date-fns";
import { User, Calendar, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { User as UserType } from "@/lib/mock-api";

interface ProfileCardProps {
  user: UserType;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="glass-card p-8 animate-scale-in">
      <div className="text-center mb-6">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback className="gradient-accent text-accent-foreground text-2xl">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <h1 className="text-2xl font-bold text-primary mb-2">{user.name}</h1>
        <Badge variant="secondary" className="text-sm">
          Community Contributor
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="text-center p-4 bg-secondary/20 rounded-xl">
          <Award className="h-8 w-8 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">{user.contributions}</div>
          <div className="text-sm text-muted-foreground">Contributions</div>
        </div>
        
        <div className="text-center p-4 bg-secondary/20 rounded-xl">
          <User className="h-8 w-8 text-accent mx-auto mb-2" />
          <div className="text-lg font-semibold text-primary">Active</div>
          <div className="text-sm text-muted-foreground">Member Status</div>
        </div>
        
        <div className="text-center p-4 bg-secondary/20 rounded-xl">
          <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
          <div className="text-sm font-medium text-primary">
            {formatDistanceToNow(new Date(user.lastActiveAt), { addSuffix: true })}
          </div>
          <div className="text-sm text-muted-foreground">Last Active</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-accent/5 rounded-xl border-l-4 border-accent">
        <h3 className="font-semibold text-primary mb-2">Community Impact</h3>
        <p className="text-sm text-muted-foreground">
          {user.name} has made {user.contributions} valuable contributions to the community knowledge base, 
          helping others find answers and learn from shared resources.
        </p>
      </div>
    </div>
  );
}