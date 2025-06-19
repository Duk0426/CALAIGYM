import { ProfileCard } from "@/components/ProfileCard";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) return <div>Please log in</div>;

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {profile && user ? (
        <ProfileCard
          name={user.name}
          age={profile.age ?? undefined}
          weight={profile.weight ?? undefined}
          goal={profile.goal ?? undefined}
        />
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
}
