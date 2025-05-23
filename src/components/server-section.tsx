"use client";
import { ActionTooltip } from "@/components/ui/action-tooltip";
import { useStore } from "@/store/store";
import { ServerWithMembersWithProfiles } from "@/types/server";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus ,Settings} from "lucide-react";

interface ServerSectionProps {
	label: string;
	role?: MemberRole;
	sectionType: "channels" | "members";
	channelType?: ChannelType;
	server?: ServerWithMembersWithProfiles;
}

export function ServerSection({ label, role, sectionType, channelType, server }: ServerSectionProps) {
	const isOpen = useStore.use.isOpen();
	const onOpen = useStore.use.onOpen();

	return (
		<div className="flex items-center justify-between p-2 ">
			<p className="text-sm font-semibold uppercase text-zinc-500 dark:text-zinc-400">{label}</p>
			{role !== MemberRole.GUEST && sectionType === "channels" && (
				<ActionTooltip label="Create Channel" side="top">
					<button
						onClick={() => onOpen("createChannel",{channelType})}
						className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
					>
						<Plus className="h-4 w-4" />
					</button>
				</ActionTooltip>
			)}
			{role === MemberRole.ADMIN && sectionType === "members" && (
				<ActionTooltip label="Manage Members" side="top">
					<button
						onClick={() => onOpen("manageMembers", { server })}
						className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
					>
						<Settings className="h-4 w-4" />
					</button>
				</ActionTooltip>
			)}
		</div>
	);
}
