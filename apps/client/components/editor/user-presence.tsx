import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface User {
  clientId: number;
  name: string;
  color: string;
}

interface UserPresenceProps {
  users: User[];
}

export function UserPresence({ users }: UserPresenceProps) {
  // Remove duplicates (same user connected from multiple devices)
  const uniqueUsers = Array.from(
    new Map(users.map(user => [user.name, user])).values()
  );

  return (
    <div className="flex items-center space-x-1">
      <span className="text-xs text-muted-foreground mr-2">
        {uniqueUsers.length === 0
          ? 'Only you are editing'
          : `${uniqueUsers.length} ${
              uniqueUsers.length === 1 ? 'person' : 'people'
            } editing`}
      </span>
      <div className="flex -space-x-2">
        <TooltipProvider>
          {uniqueUsers.slice(0, 5).map((user) => (
            <Tooltip key={user.clientId}>
              <TooltipTrigger asChild>
                <Avatar className="h-6 w-6 border-2 border-background" style={{ borderColor: user.color }}>
                  <AvatarFallback style={{ backgroundColor: user.color, color: isLightColor(user.color) ? '#000' : '#fff' }}>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {user.name}
              </TooltipContent>
            </Tooltip>
          ))}
          {uniqueUsers.length > 5 && (
            <Avatar className="h-6 w-6 border-2 border-background">
              <AvatarFallback>+{uniqueUsers.length - 5}</AvatarFallback>
            </Avatar>
          )}
        </TooltipProvider>
      </div>
    </div>
  );
}

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // Convert hex to RGB
  let hex = color.replace('#', '');
  
  // Parse components
  let r = parseInt(hex.substr(0, 2), 16) || 0;
  let g = parseInt(hex.substr(2, 2), 16) || 0;
  let b = parseInt(hex.substr(4, 2), 16) || 0;
  
  // Calculate brightness (Perceived luminance formula)
  let brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 125;
}